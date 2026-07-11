import express from "express";
import {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} from "./income.controller.js";
import { protect } from "../../common/middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, addIncome);
router.get("/", protect, getAllIncome);
router.get("/download", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);

export default router;
