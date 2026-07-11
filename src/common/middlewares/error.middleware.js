import AppError from "../utils/AppError.js";

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  const isAppError = err instanceof AppError;

  let statusCode = isAppError ? err.statusCode : 500;
  let message = isAppError
    ? err.message
    : "Something went wrong. Please try again later.";

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Resource not found";
  }
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    statusCode = 400;
    message = "File too large. Max size is 5MB.";
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? "🥷" : err.stack,
  });
};
