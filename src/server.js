const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const port = 3000;
connectDB();

app.use(express.json());

app.get("api/search", (req, res) => {});

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
