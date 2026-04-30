const mongoose = require("mongoose");

const moneySchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, uppercase: true, trim: true },
  },
  { _id: false }
);

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    alt: { type: String, default: "", trim: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    images: {
      type: [imageSchema],
      default: [],
      validate: {
        validator(v) {
          return Array.isArray(v) && v.length >= 1 && v.every((img) => img && String(img.url || "").trim());
        },
        message: "At least one image with a URL is required",
      },
    },
    roseColor: { type: String, required: true, trim: true },
    boxColor: { type: String, required: true, trim: true },
    price: { type: moneySchema, required: true },
    quantity: { type: Number, required: true, default: 0, min: 0 },
    status: { type: String, enum: ["active", "draft", "archived"], default: "active", index: true },
  },
  { timestamps: true }
);

productSchema.index({ title: "text", description: "text" });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
