import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} from "./auth.controller.js";
import { protect } from "../../common/middlewares/auth.middleware.js";
import upload from "../../common/middlewares/upload.middleware.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);

export default router;
