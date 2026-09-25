const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

// !Internal utility function to generate JWT tokens
const generateAccessTokenAndRefreshTokens = async () => {};

// !Desc: Register a new user
// !Route: POST /users/register
// !Access: Public
const registerUser = async (req, res) => {
  //Get user details from request
  const { username, email, password } = req.body;
  // Validations
  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with email already exists");
  }
  // Create the User
  const user = await User.create({
    username: username.toLowerCase().trim(), //trim()?
    email: email.toLowerCase().trim(), //trim()?
    password,
  });
  // remove password and refresh token from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  if (!createdUser) {
    throw new Error("Error register user"); //400, 500
  }
  // Return the response
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
};

// !Desc: Login user and generate tokens
// !Route: POST /users/login
// !Access: Public
const loginUser = async (req, res) => {};

// !Desc: Logout user and clear tokens
// !Route: POST /users/logout
// !Access: Public
const logoutUser = async (req, res) => {};

// ?Desc: Refresh access token using refresh token
// ?Route: POST /users/refresh-token
// ?Access: Public
const refreshAccessToken = async (req, res) => {};

// !Desc: Get user profile
// !Route: GET /users/profile
// !Access: Private
const getUserProfile = async (req, res) => {};

// !Desc: Update user's account details
// ?Route: PATCH /users/current //PATCH or PUT
// !Access: Private
const updateAccountDetails = async (req, res) => {};

// !Desc: Change user password
// !Route: PATCH /users/change-password
// !Access: Private
const changePassword = async (req, res) => {};

// !Desc: Request password reset email
// !Route: POST /users/request-reset-password
// !Access: Private
const requestPasswordReset = async (req, res) => {};

// !Desc: Reset password using reset token
// !route: POST /users/reset-password/:token
// !Access: Private
const resetPassword = async (req, res) => {};

module.exports = { registerUser };
