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
  // Validations
  // Check if user already exists
  // Create the User
  // remove password and refresh token from response
  // Return the response
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
