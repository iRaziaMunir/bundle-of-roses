const express = require("express");
const Collection = require("../models/Collection");

const router = express.Router();

router.get("/", async (req, res) => {
  const collections = await Collection.find({ isActive: true }).sort({ name: 1 });
  res.json(collections);
});

module.exports = router;