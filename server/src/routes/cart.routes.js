const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const router = express.Router();

function getIdentity(req) {
  const userId = req.header("x-user-id") || null;
  const sessionId = req.header("x-session-id") || null;
  return { userId, sessionId };
}

async function getOrCreateCart({ userId, sessionId }) {
  if (!userId && !sessionId) {
    const err = new Error("Missing identity. Provide x-user-id or x-session-id.");
    err.statusCode = 400;
    throw err;
  }

  const filter = userId ? { userId } : { sessionId };
  let cart = await Cart.findOne(filter);
  if (!cart) cart = await Cart.create({ ...filter, currency: "USD", items: [] });
  return cart;
}

// GET /api/cart
router.get("/", async (req, res) => {
  const cart = await getOrCreateCart(getIdentity(req));
  res.json(cart);
});

// POST /api/cart/items
// body: { productId, quantity, customization? }
router.post("/items", async (req, res) => {
  const cart = await getOrCreateCart(getIdentity(req));
  const { productId, quantity = 1, customization = {} } = req.body || {};

  if (!productId) return res.status(400).json({ message: "productId is required" });

  const product = await Product.findOne({ _id: productId, status: "active" });
  if (!product) return res.status(404).json({ message: "Product not found" });

  const qty = Math.max(1, Number(quantity) || 1);
  const unitPrice = product.price;

  cart.items.push({
    productId,
    quantity: qty,
    unitPrice,
    customization,
  });
  await cart.save();

  res.status(201).json(cart);
});

// PATCH /api/cart/items/:itemId
router.patch("/items/:itemId", async (req, res) => {
  const cart = await getOrCreateCart(getIdentity(req));
  const item = cart.items.id(req.params.itemId);
  if (!item) return res.status(404).json({ message: "Cart item not found" });

  if (req.body?.quantity != null) {
    const qty = Number(req.body.quantity);
    if (!Number.isFinite(qty) || qty < 1) return res.status(400).json({ message: "quantity must be >= 1" });
    item.quantity = qty;
  }

  await cart.save();
  res.json(cart);
});

// DELETE /api/cart/items/:itemId
router.delete("/items/:itemId", async (req, res) => {
  const cart = await getOrCreateCart(getIdentity(req));
  const item = cart.items.id(req.params.itemId);
  if (!item) return res.status(404).json({ message: "Cart item not found" });
  item.deleteOne();
  await cart.save();
  res.json(cart);
});

module.exports = router;
