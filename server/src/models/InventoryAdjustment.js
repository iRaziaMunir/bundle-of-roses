const mongoose = require("mongoose");

const inventoryAdjustmentSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    variantId: { type: mongoose.Schema.Types.ObjectId, default: null, index: true },
    type: { type: String, enum: ["set", "increment", "decrement"], required: true },
    beforeQty: { type: Number, required: true, min: 0 },
    afterQty: { type: Number, required: true, min: 0 },
    reason: { type: String, default: "", trim: true },
    note: { type: String, default: "", trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model("InventoryAdjustment", inventoryAdjustmentSchema);

