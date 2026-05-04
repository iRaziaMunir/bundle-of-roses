const express = require("express");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const multer = require("multer");
const Product = require("../models/Product");
const Collection = require("../models/Collection");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const User = require("../models/User");
const InventoryAdjustment = require("../models/InventoryAdjustment");
const { formatProductWriteError, statusCodeForProductWriteError } = require("../utils/formatProductWriteError");

const router = express.Router();

// Minimal admin guard for now (replace with proper auth/JWT)
router.use((req, res, next) => {
  const isAdmin = String(req.header("x-admin") || "").toLowerCase() === "true";
  if (!isAdmin) return res.status(401).json({ message: "Admin access required" });
  next();
});

const uploadsRoot = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsRoot)) fs.mkdirSync(uploadsRoot, { recursive: true });

const imageStorage = multer.diskStorage({
  destination: uploadsRoot,
  filename(req, file, cb) {
    const ext = path.extname(file.originalname || "") || "";
    const base = path
      .basename(file.originalname || "image", ext)
      .replace(/[^a-z0-9-_]/gi, "-")
      .slice(0, 48);
    cb(null, `${Date.now()}-${base || "image"}${ext || ""}`);
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    if (!file.mimetype || !file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

router.post("/uploads", (req, res) => {
  imageUpload.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message || "Upload failed" });
    if (!req.file) return res.status(400).json({ message: "No image file" });
    const url = `/api/uploads/${req.file.filename}`;
    res.status(201).json({ url });
  });
});

// PRODUCTS CRUD
router.get("/products", async (req, res) => {
  const status = req.query.status;
  const filter = {};
  if (status && ["active", "draft", "archived"].includes(String(status))) filter.status = String(status);
  const products = await Product.find(filter).sort({ updatedAt: -1 }).limit(500);
  res.json(products);
});

router.post("/products", async (req, res) => {
  try {
    const payload = req.body || {};
    const product = await Product.create(payload);
    res.status(201).json(product);
  } catch (err) {
    const message = formatProductWriteError(err);
    res.status(statusCodeForProductWriteError(err)).json({ message });
  }
});

router.patch("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body || {}, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    const message = formatProductWriteError(err);
    res.status(statusCodeForProductWriteError(err)).json({ message });
  }
});

router.delete("/products/:id/permanent", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const objectId = new mongoose.Types.ObjectId(String(id));

    await Collection.updateMany({ productIds: objectId }, { $pull: { productIds: objectId } });

    await Cart.updateMany({ "items.productId": objectId }, { $pull: { items: { productId: objectId } } });

    await InventoryAdjustment.deleteMany({ productId: objectId });

    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted", id: String(id) });
  } catch (err) {
    res.status(400).json({ message: err?.message || "Unable to delete product" });
  }
});

router.delete("/products/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { status: "archived" }, { new: true });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// Inventory adjust (product-level stock)
router.post("/products/:productId/inventory-adjust", async (req, res) => {
  const { type, delta, quantity, reason = "", note = "" } = req.body || {};
  if (!["set", "increment", "decrement"].includes(type)) return res.status(400).json({ message: "Invalid type" });

  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const beforeQty = Number(product.quantity || 0);
  let afterQty = beforeQty;

  if (type === "set") {
    const q = Number(quantity);
    if (!Number.isFinite(q) || q < 0) return res.status(400).json({ message: "quantity must be >= 0" });
    afterQty = q;
  } else {
    const d = Number(delta);
    if (!Number.isFinite(d) || d <= 0) return res.status(400).json({ message: "delta must be > 0" });
    afterQty = type === "increment" ? beforeQty + d : Math.max(0, beforeQty - d);
  }

  product.quantity = afterQty;
  await product.save();

  const createdBy = req.header("x-user-id") || null;
  const adj = await InventoryAdjustment.create({
    productId: product._id,
    variantId: null,
    type,
    beforeQty,
    afterQty,
    reason,
    note,
    createdBy,
  });

  res.status(201).json({ product, adjustment: adj });
});

// Inventory adjustment history
router.get("/inventory-adjustments", async (req, res) => {
  const { productId } = req.query || {};
  const filter = {};
  if (productId) filter.productId = productId;
  const adjustments = await InventoryAdjustment.find(filter).sort({ createdAt: -1 }).limit(500);
  res.json(adjustments);
});

// COLLECTIONS CRUD
router.get("/collections", async (req, res) => {
  const collections = await Collection.find({}).sort({ updatedAt: -1 }).limit(500);
  res.json(collections);
});

router.post("/collections", async (req, res) => {
  const collection = await Collection.create(req.body || {});
  res.status(201).json(collection);
});

router.patch("/collections/:id", async (req, res) => {
  const collection = await Collection.findByIdAndUpdate(req.params.id, req.body || {}, { new: true });
  if (!collection) return res.status(404).json({ message: "Collection not found" });
  res.json(collection);
});

// ORDERS
router.get("/orders", async (req, res) => {
  const orders = await Order.find({}).sort({ createdAt: -1 }).limit(500);
  res.json(orders);
});

router.patch("/orders/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body || {}, { new: true });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

// USERS
router.get("/users", async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 }).limit(500);
  res.json(users);
});

router.patch("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body || {}, { new: true });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

module.exports = router;

