import express from "express";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import "dotenv/config";

const app = express();

connectDB();

app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRouter);

app.use(notFound);
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
