const express = require("express");
const { registerUser } = require("../controllers/userController");

const userRouter = express.Router();

//Public routes
//!register
userRouter.post("/register", registerUser);

//Private routes

module.exports = userRouter;
