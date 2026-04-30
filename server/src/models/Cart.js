const mongoose = require("mongoose");

const moneySchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, uppercase: true, trim: true },
  },
  { _id: false }
);

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    unitPrice: { type: moneySchema, required: true },
    customization: {
      giftMessage: {
        type: { type: String, enum: ["paper", "ecard"], default: "paper" },
        title: { type: String, default: "", trim: true },
        message: { type: String, default: "", trim: true },
      },
      scent: {
        code: { type: String, default: "", trim: true },
        name: { type: String, default: "", trim: true },
        priceDelta: { type: Number, default: 0 },
      },
      addons: [
        {
          code: { type: String, default: "", trim: true },
          name: { type: String, default: "", trim: true },
          price: { type: Number, default: 0, min: 0 },
        },
      ],
    },
    addedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
    sessionId: { type: String, default: "", index: true },
    currency: { type: String, default: "USD", uppercase: true, trim: true },
    items: { type: [cartItemSchema], default: [] },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

cartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, partialFilterExpression: { expiresAt: { $type: "date" } } });

module.exports = mongoose.model("Cart", cartSchema);

