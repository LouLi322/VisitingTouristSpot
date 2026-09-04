const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 3000;

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Fail to connect to MongoDB:", err.message);
    process.exit(1);
  }
};
connectDB();

app.use(express.json());

app.get("api/search", (req, res) => {});

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
