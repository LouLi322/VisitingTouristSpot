const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Fail to connect to MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
