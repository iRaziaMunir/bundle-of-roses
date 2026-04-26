const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productsRoutes = require("./routes/products.routes");
const collectionsRoutes = require("./routes/collections.routes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.use("/api/products", productsRoutes);
app.use("/api/collections", collectionsRoutes);

const PORT = process.env.PORT || 3000;

async function startServer(){
  try{
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }catch(error){
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
