const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const userRouter = express.Router();

//Public routes
//!register
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

//Private routes

module.exports = userRouter;
