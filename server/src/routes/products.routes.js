const express = require("express");
const Product = require("../models/Product");
const Collection = require("../models/Collection");

const router = express.Router();

function pickPublicProductFields(product) {
  return {
    _id: product._id,
    title: product.title,
    slug: product.slug,
    description: product.description,
    images: product.images,
    roseColor: product.roseColor,
    boxColor: product.boxColor,
    price: product.price,
    quantity: product.quantity,
    status: product.status,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

// GET /api/products?search=rose
router.get("/", async (req, res) => {
  const { search, status } = req.query;

  const filter = {};
  filter.status = "active";
  if (status && ["active", "draft", "archived"].includes(String(status))) {
    filter.status = String(status);
  }

  if (search) {
    const q = String(search).trim();
    filter.$text = { $search: q };
  }

  const products = await Product.find(filter)
    .sort(search ? { score: { $meta: "textScore" } } : { createdAt: -1 })
    .limit(200);

  res.json(products.map(pickPublicProductFields));
});

// GET /api/products/:slug
router.get("/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, status: "active" });

  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json(pickPublicProductFields(product));
});

module.exports = router;
