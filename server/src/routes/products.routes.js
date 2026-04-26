const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET /api/products?collection=grand-gestures&search=rose
router.get("/", async (req, res) => {
  const { collection, search } = req.query;

  const filter = { isActive: true };

  if (collection) filter.collectionSlug = String(collection).toLowerCase();

  if (search) {
    const q = String(search).trim();
    filter.name = { $regex: q, $options: "i" };
  }

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
});

// GET /api/products/:slug
router.get("/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true });

  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json(product);
});

module.exports = router;