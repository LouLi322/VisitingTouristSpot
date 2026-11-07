import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";

import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

import userRouter from "./routes/userRoutes.js";
import attractionRouter from "./routes/attractionRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
connectDB();

app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/attractions", attractionRouter);

app.use(notFound);
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
