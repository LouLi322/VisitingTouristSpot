const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changePassword,
} = require("../controllers/userController");
const verifyJWT = require("../middlewares/auth");
const cookieParser = require("cookie-parser");

const userRouter = express.Router();

//!Public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/refresh-token", refreshAccessToken);

//!Private routes
userRouter.post("/logout", verifyJWT, logoutUser);
userRouter.patch("/change-password", verifyJWT, changePassword);

module.exports = userRouter;
