const mongoose = require("mongoose");

const moneySchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, uppercase: true, trim: true },
  },
  { _id: false }
);

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    title: { type: String, required: true, trim: true },
    roseColor: { type: String, default: "", trim: true },
    boxColor: { type: String, default: "", trim: true },
    quantity: { type: Number, required: true, min: 1 },
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
    lineTotal: { type: moneySchema, required: true },
  },
  { _id: true }
);

const addressSchema = new mongoose.Schema(
  {
    recipientName: { type: String, default: "", trim: true },
    phone: { type: String, default: "", trim: true },
    line1: { type: String, default: "", trim: true },
    line2: { type: String, default: "", trim: true },
    city: { type: String, default: "", trim: true },
    state: { type: String, default: "", trim: true },
    postalCode: { type: String, default: "", trim: true },
    country: { type: String, default: "", trim: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    items: { type: [orderItemSchema], default: [] },
    pricing: {
      subtotal: { type: moneySchema, required: true },
      shippingTotal: { type: moneySchema, required: true },
      discountTotal: { type: moneySchema, required: true },
      taxTotal: { type: moneySchema, required: true },
      grandTotal: { type: moneySchema, required: true },
    },
    shipping: {
      method: { type: String, default: "standard", trim: true },
      address: { type: addressSchema, default: {} },
      deliveryDate: { type: Date, default: null },
    },
    status: {
      orderStatus: { type: String, enum: ["pending", "paid", "cancelled", "refunded"], default: "pending", index: true },
      fulfillmentStatus: {
        type: String,
        enum: ["unfulfilled", "processing", "shipped", "delivered"],
        default: "unfulfilled",
        index: true,
      },
    },
    payment: {
      provider: { type: String, default: "", trim: true },
      referenceId: { type: String, default: "", trim: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

