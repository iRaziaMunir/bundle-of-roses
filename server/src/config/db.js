const mongoose = require('mongoose');

async function connectDB(MONGODB_URI){
  if(!MONGODB_URI){
    throw new Error("MongoDB URI is required");
  }
  try{
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  }catch(error){
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = connectDB;