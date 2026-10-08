const JWT = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const appConfig = require("../config/appConfig");
const ApiResponse = require("../utils/ApiResponse");

const verifyJWT = async (req, res, next) => {
  try {
    // console.log("req.cookies:", req.cookies);
    // console.log("req.headers:", req.headers);
    let token =
      req?.cookies?.accessToken || req?.headers.authorization?.split(" ")?.[1];
    // console.log("token:", token);
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = JWT.verify(token, appConfig.accessTokenSecret);
    // console.log("decodedToken:", decodedToken);
    const user = await User.findById(decodedToken._id);
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
};

//?check out if the user is a admin?

module.exports = verifyJWT;
