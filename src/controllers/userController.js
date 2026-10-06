const JWT = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const appConfig = require("../config/appConfig");

// Internal utility function to generate JWT tokens
const generateAccessTokenAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

// Desc: Register a new user
// Route: POST /api/users/register
// Access: Public
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
    username: username.toLowerCase(), //trim()?
    email: email.toLowerCase(), //trim()?
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
// !Route: POST /api/users/login
// !Access: Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found"); //
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(404, "Invalid credentials");
  }
  //generate tokens
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshTokens(user._id);
  const loggedUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  //Set cookies
  const cookieOptions = {
    //?
    httpOnly: true,
    sameSite: "strict",
    secure: appConfig.nodeEnv === "production",
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions) //?
    .cookie("refreshToken", refreshToken, cookieOptions) //?
    .json(
      new ApiResponse(
        200,
        { user: loggedUser, accessToken, refreshToken },
        "User logged in successfully",
      ),
    );
};

// !Desc: Logout user and clear tokens
// !Route: POST /api/users/logout
// !Access: Public
const logoutUser = async (req, res) => {};

// ?Desc: Refresh access token using refresh token
// ?Route: POST /users/refresh-token
// ?Access: Public
const refreshAccessToken = async (req, res) => {};

// !Desc: Get user profile
// !Route: GET /api/users/profile
// !Access: Private
const getUserProfile = async (req, res) => {};

// !Desc: Update user's account details
// ?Route: PATCH /api/users/current //PATCH or PUT
// !Access: Private
const updateAccountDetails = async (req, res) => {};

// !Desc: Change user password
// !Route: PATCH /api/users/change-password
// !Access: Private
const changePassword = async (req, res) => {};

// !Desc: Request password reset email
// !Route: POST /api/users/request-reset-password
// !Access: Private
const requestPasswordReset = async (req, res) => {};

// !Desc: Reset password using reset token
// !route: POST /api/users/reset-password/:token
// !Access: Private
const resetPassword = async (req, res) => {};

module.exports = { registerUser, loginUser };
