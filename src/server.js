const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connection...");
  })
  .catch((err) => {
    console.log("Error connecting to database", err.massage);
  });

app.use(express.json());

app.get("api/search", (req, res) => {});

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
