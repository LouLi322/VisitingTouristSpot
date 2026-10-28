import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changePassword,
  getUserProfile,
  updateAccountDetails,
} from "../controllers/userController.js";
import verifyJWT from "../middlewares/auth.js";
import cookieParser from "cookie-parser";

const userRouter = express.Router();

//!Public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/refresh-token", refreshAccessToken);

//!Private routes
userRouter.post("/logout", verifyJWT, logoutUser);
userRouter.get("/profile", verifyJWT, getUserProfile);
userRouter.patch("/change-password", verifyJWT, changePassword);
userRouter.patch("/update-account", verifyJWT, updateAccountDetails);

export default userRouter;
