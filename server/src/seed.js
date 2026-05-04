const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Collection = require("./models/Collection");
const Product = require("./models/Product");

dotenv.config();

async function seed() {
  await connectDB(process.env.MONGODB_URI);

  await Collection.deleteMany({});
  await Product.deleteMany({});

  const products = await Product.insertMany([
    {
      title: "Baby Heart Beige Box",
      slug: "baby-heart-beige-box",
      description: "Small in size, big in sentiment.",
      images: [{ url: "https://placehold.co/600x600/f7e6ea/1d1a1a?text=Baby+Heart", alt: "Baby Heart Beige Box" }],
      roseColor: "White",
      boxColor: "Beige",
      price: { amount: 190, currency: "USD" },
      quantity: 25,
      status: "active",
    },
    {
      title: "Classic Black Superdome Box",
      slug: "classic-black-superdome-box",
      description: "A grand gesture with serious presence.",
      images: [{ url: "https://placehold.co/600x600/f7e6ea/1d1a1a?text=Superdome", alt: "Classic Black Superdome Box" }],
      roseColor: "Red",
      boxColor: "Black",
      price: { amount: 410, currency: "USD" },
      quantity: 10,
      status: "active",
    },
  ]);

  const [p1, p2] = products;

  await Collection.insertMany([
    { title: "Grand Gestures", slug: "grand-gestures", status: "active", productIds: [p2._id] },
    { title: "Small Surprises", slug: "small-surprises", status: "active", productIds: [p1._id] },
    { title: "Most Gifted", slug: "most-gifted", status: "active", productIds: [p1._id, p2._id] },
  ]);

  console.log("Seed done");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
