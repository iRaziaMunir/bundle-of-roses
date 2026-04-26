const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Collection = require("./models/Collection");
const Product = require("./models/Product");

dotenv.config();

async function seed() {
  await connectDB(process.env.MONGODB_URI);

  await Collection.deleteMany({});
  await Product.deleteMany({});

  await Collection.insertMany([
    { name: "Grand Gestures", slug: "grand-gestures" },
    { name: "Small Surprises", slug: "small-surprises" },
    { name: "Most Gifted", slug: "most-gifted" },
  ]);

  await Product.insertMany([
    {
      name: "Red Rose Bouquet",
      slug: "red-rose-bouquet",
      price: 1499,
      images: [],
      collectionSlug: "grand-gestures",
      stockQuantity: 20,
    },
    {
      name: "Pink Tulip Set",
      slug: "pink-tulip-set",
      price: 899,
      images: [],
      collectionSlug: "small-surprises",
      stockQuantity: 50,
    },
  ]);

  console.log("Seed done");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});