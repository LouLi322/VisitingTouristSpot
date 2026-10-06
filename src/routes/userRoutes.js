const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");
const verifyJWT = require("../middlewares/auth");
const cookieParser = require("cookie-parser");

const userRouter = express.Router();

//!Public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

//!Private routes
userRouter.post("/logout", verifyJWT, logoutUser);

module.exports = userRouter;
