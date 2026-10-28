import JWT from "jsonwebtoken";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import appConfig from "../config/appConfig.js";
import ApiResponse from "../utils/ApiResponse.js";

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

export default verifyJWT;
