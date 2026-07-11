import jwt from "jsonwebtoken";
import User from "../../models/User.js"; // adjust path
import AppError from "../utils/AppError.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return next(new AppError("No token provided. Please login first.", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new AppError("User not found. Please login again.", 401));
    }

    req.user = user;
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new AppError("Token expired. Please login again.", 401));
    }
    if (err.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token", 401));
    }
    return next(err);
  }
};
