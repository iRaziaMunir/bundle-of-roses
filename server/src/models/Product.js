const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },

    description: { type: String, default: "" },

    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, default: null },

    images: [{ type: String }],

    collectionSlug: { type: String, required: true, lowercase: true, trim: true },

    stockQuantity: { type: Number, default: 0, min: 0 },
    sku: { type: String, default: "" },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;