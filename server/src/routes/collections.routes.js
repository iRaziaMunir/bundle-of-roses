const express = require("express");
const mongoose = require("mongoose");
const Collection = require("../models/Collection");
const Product = require("../models/Product");

const router = express.Router();


router.get("/:slug/products", async (req, res) =>{
  const slug = String(req.params.slug || "").toLowerCase();
  const limit = Math.min(Number(req.query.limit || 4), 50);

  const collection = await Collection.findOne({slug, status: "active"});
  if(!collection) return res.status(404).json({message: "Collection not found"});

  const ids = Array.isArray(collection.productIds) ? collection.productIds : [];
  const products = await Product.find({_id: {$in: ids}, status: "active"})
  .select("title slug images price quantity status")
  .limit(limit);

  res.json({title: collection.title, slug: collection.slug, products});
})


router.get("/", async (req, res) => {
  const collections = await Collection.find({ status: "active" }).sort({ title: 1 });
  res.json(collections);
});

/**
 * Storefront: all collections summary + products (union of all collection items, or one collection if ?slug=)
 * Must be registered before /:slug
 */
router.get("/browse", async (req, res) => {
  try {
    const filterSlug = String(req.query.slug || req.query.collection || "")
      .trim()
      .toLowerCase();

    const collections = await Collection.find({ status: "active" })
      .sort({ title: 1 })
      .select("title slug description productIds")
      .lean();

    const collectionSummaries = collections.map((doc) => ({
      _id: doc._id,
      title: doc.title,
      slug: doc.slug,
      description: doc.description || "",
      productCount: Array.isArray(doc.productIds) ? doc.productIds.length : 0,
    }));

    const uniqueIdStrings = new Set();
    if (filterSlug) {
      const match = collections.find((c) => c.slug === filterSlug);
      if (!match) {
        return res.status(404).json({ message: "Collection not found" });
      }
      (match.productIds || []).forEach((id) => uniqueIdStrings.add(String(id)));
    } else {
      collections.forEach((doc) => {
        (doc.productIds || []).forEach((id) => uniqueIdStrings.add(String(id)));
      });
    }

    const objectIds = [...uniqueIdStrings]
      .filter(Boolean)
      .map((id) => {
        try {
          return new mongoose.Types.ObjectId(id);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    const products =
      objectIds.length === 0
        ? []
        : await Product.find({ _id: { $in: objectIds }, status: "active" })
            .select("title slug images price quantity status")
            .sort({ title: 1 })
            .lean();

    res.json({
      collections: collectionSummaries,
      products,
      activeCollectionSlug: filterSlug || null,
    });
  } catch (err) {
    res.status(500).json({ message: err?.message || "Unable to load collections" });
  }
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