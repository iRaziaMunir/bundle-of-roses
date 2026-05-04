const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productsRoutes = require("./routes/products.routes");
const collectionsRoutes = require("./routes/collections.routes");
const cartRoutes = require("./routes/cart.routes");
const ordersRoutes = require("./routes/orders.routes");
const adminRoutes = require("./routes/admin.routes");
const Product = require("./models/Product");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.use("/api/products", productsRoutes);
app.use("/api/collections", collectionsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

async function startServer(){
  try{
    await connectDB(process.env.MONGODB_URI);
    await Product.syncIndexes();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }catch(error){
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
