const express = require("express");
const Collection = require("../models/Collection");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  const collections = await Collection.find({ status: "active" }).sort({ title: 1 });
  res.json(collections);
});

// GET /api/collections/:slug (returns collection + its products)
router.get("/:slug", async (req, res) => {
  const collection = await Collection.findOne({ slug: String(req.params.slug).toLowerCase(), status: "active" });
  if (!collection) return res.status(404).json({ message: "Collection not found" });

  const ids = Array.isArray(collection.productIds) ? collection.productIds : [];
  const products = await Product.find({ _id: { $in: ids }, status: "active" }).sort({ createdAt: -1 });

  res.json({ collection, products });
});

module.exports = router;