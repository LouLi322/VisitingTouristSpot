const express = require("express");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

connectDB();

app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
