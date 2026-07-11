import express from "express";
import { getDashboardData } from "./dashboard.controller.js";
import { protect } from "../../common/middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getDashboardData);

export default router;
