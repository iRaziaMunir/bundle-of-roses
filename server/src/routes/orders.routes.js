const express = require("express");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");
const InventoryAdjustment = require("../models/InventoryAdjustment");

const router = express.Router();

function getIdentity(req) {
  const userId = req.header("x-user-id") || null;
  const sessionId = req.header("x-session-id") || null;
  return { userId, sessionId };
}

async function getCart({ userId, sessionId }) {
  if (!userId && !sessionId) return null;
  const filter = userId ? { userId } : { sessionId };
  return Cart.findOne(filter);
}

function makeOrderNumber() {
  const now = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `BOR-${now}-${rand}`;
}

function money(amount, currency) {
  return { amount: Math.round(Number(amount) * 100) / 100, currency };
}

function calcLineTotal(unitPrice, qty, customization) {
  const addonsTotal =
    (customization?.addons || []).reduce((sum, a) => sum + (Number(a.price) || 0), 0) + (Number(customization?.scent?.priceDelta) || 0);
  return (Number(unitPrice.amount) || 0) * qty + addonsTotal;
}

// POST /api/orders/checkout
router.post("/checkout", async (req, res) => {
  const identity = getIdentity(req);
  const cart = await getCart(identity);
  if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart is empty" });

  const email = String(req.body?.email || "").trim().toLowerCase();
  if (!email) return res.status(400).json({ message: "email is required" });

  const currency = cart.currency || "USD";

  const orderItems = [];
  let subtotal = 0;

  for (const item of cart.items) {
    const product = await Product.findOne({ _id: item.productId, status: "active" });
    if (!product) return res.status(400).json({ message: "A product in your cart is no longer available" });

    if (product.quantity < item.quantity) {
      return res.status(400).json({ message: `Not enough stock for ${product.title}` });
    }

    const unitPrice = product.price;
    const lineTotalAmount = calcLineTotal(unitPrice, item.quantity, item.customization);
    subtotal += lineTotalAmount;

    orderItems.push({
      productId: product._id,
      title: product.title,
      roseColor: product.roseColor || "",
      boxColor: product.boxColor || "",
      quantity: item.quantity,
      unitPrice,
      customization: item.customization || {},
      lineTotal: money(lineTotalAmount, currency),
    });
  }

  const shippingTotal = 0;
  const discountTotal = 0;
  const taxTotal = 0;
  const grandTotal = subtotal + shippingTotal - discountTotal + taxTotal;

  const order = await Order.create({
    orderNumber: makeOrderNumber(),
    userId: identity.userId || null,
    email,
    items: orderItems,
    pricing: {
      subtotal: money(subtotal, currency),
      shippingTotal: money(shippingTotal, currency),
      discountTotal: money(discountTotal, currency),
      taxTotal: money(taxTotal, currency),
      grandTotal: money(grandTotal, currency),
    },
    shipping: {
      method: String(req.body?.shipping?.method || "standard"),
      address: req.body?.shipping?.address || {},
      deliveryDate: req.body?.shipping?.deliveryDate ? new Date(req.body.shipping.deliveryDate) : null,
    },
    status: {
      orderStatus: req.body?.markPaid ? "paid" : "pending",
      fulfillmentStatus: "unfulfilled",
    },
    payment: {
      provider: String(req.body?.payment?.provider || ""),
      referenceId: String(req.body?.payment?.referenceId || ""),
    },
  });

  if (order.status.orderStatus === "paid") {
    for (const it of order.items) {
      const product = await Product.findById(it.productId);
      if (!product) continue;

      const beforeQty = Number(product.quantity || 0);
      const afterQty = Math.max(0, beforeQty - it.quantity);
      product.quantity = afterQty;
      await product.save();

      await InventoryAdjustment.create({
        productId: product._id,
        variantId: null,
        type: "decrement",
        beforeQty,
        afterQty,
        reason: "order_paid",
        createdBy: identity.userId || null,
      });
    }
  }

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
});

// GET /api/orders/:orderNumber
router.get("/:orderNumber", async (req, res) => {
  const order = await Order.findOne({ orderNumber: String(req.params.orderNumber) });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

module.exports = router;
