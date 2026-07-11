import asyncHandler from "../../common/utils/asyncHandler.js";
import AppError from "../../common/utils/AppError.js";
import { addExpenseSchema } from "./expense.schema.js";
import {
  addExpenseService,
  getAllExpenseService,
  deleteExpenseService,
  generateExpenseExcelBuffer,
} from "./expense.service.js";

export const addExpense = asyncHandler(async (req, res) => {
  const parsed = addExpenseSchema.safeParse(req.body);
  if (!parsed.success) throw new AppError(parsed.error.errors[0].message, 400);

  const expense = await addExpenseService({
    userId: req.user._id,
    ...parsed.data,
  });

  res.status(201).json({
    success: true,
    message: "Expense added successfully",
    data: expense,
  });
});

export const getAllExpense = asyncHandler(async (req, res) => {
  const expenses = await getAllExpenseService(req.user._id);

  res.status(200).json({
    success: true,
    message: "Expenses fetched successfully",
    data: expenses,
  });
});

export const deleteExpense = asyncHandler(async (req, res) => {
  await deleteExpenseService({
    expenseId: req.params.id,
    userId: req.user._id,
  });

  res.status(200).json({
    success: true,
    message: "Expense deleted successfully",
  });
});

export const downloadExpenseExcel = asyncHandler(async (req, res) => {
  const workbook = await generateExpenseExcelBuffer(req.user._id);

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );
  res.setHeader("Content-Disposition", "attachment; filename=expenses.xlsx");

  await workbook.xlsx.write(res);
  res.end();
});
