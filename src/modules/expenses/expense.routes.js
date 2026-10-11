import express from "express";
import {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
} from "./expense.controller.js";
import { protect } from "../../common/middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, addExpense);
router.get("/", protect, getAllExpense);
router.get("/download", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);

export default router;
