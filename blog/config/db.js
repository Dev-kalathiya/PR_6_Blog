const mongoose = require("mongoose");

const dbconnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/blogex"); 
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("Error connecting to database:", err.message);
    process.exit(1); 
  }
};

module.exports = dbconnect;
