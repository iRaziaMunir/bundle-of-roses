const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, default: "" },
    role: { type: String, enum: ["customer", "admin"], default: "customer", index: true },
    status: { type: String, enum: ["active", "disabled"], default: "active", index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

