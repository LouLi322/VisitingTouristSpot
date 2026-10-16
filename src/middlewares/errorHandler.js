const appConfig = require("../config/appConfig");
const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error.status || 500;
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || [], error.stack);
  }
  const response = {
    success: false,
    massage: error?.message,
    error: error?.errors,
    stack: appConfig.nodeEnv !== "production" ? error.stack : undefined,
  };
  return res.status(error.statusCode).json(response);
};

const notFound = (req, res, next) => {
  next(new ApiError(404, `Not found-${req.originalUrl}`));
  // const error = new ApiError(404, `Not found-${req.originalUrl}`);
  // next(error);
};

module.exports = { errorHandler, notFound };
