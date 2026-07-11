import asyncHandler from "../../common/utils/asyncHandler.js";
import AppError from "../../common/utils/AppError.js";
import { addIncomeSchema } from "./income.schema.js";
import {
  addIncomeService,
  getAllIncomeService,
  deleteIncomeService,
  generateIncomeExcelBuffer,
} from "./income.service.js";

export const addIncome = asyncHandler(async (req, res) => {
  const parsed = addIncomeSchema.safeParse(req.body);
  if (!parsed.success) throw new AppError(parsed.error.errors[0].message, 400);

  const income = await addIncomeService({
    userId: req.user._id,
    ...parsed.data,
  });

  res.status(201).json({
    success: true,
    message: "Income added successfully",
    data: income,
  });
});

export const getAllIncome = asyncHandler(async (req, res) => {
  const incomes = await getAllIncomeService(req.user._id);

  res.status(200).json({
    success: true,
    message: "Incomes fetched successfully",
    data: incomes,
  });
});

export const deleteIncome = asyncHandler(async (req, res) => {
  await deleteIncomeService({ incomeId: req.params.id, userId: req.user._id });

  res.status(200).json({
    success: true,
    message: "Income deleted successfully",
  });
});

export const downloadIncomeExcel = asyncHandler(async (req, res) => {
  const workbook = await generateIncomeExcelBuffer(req.user._id);

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );
  res.setHeader("Content-Disposition", "attachment; filename=incomes.xlsx");

  await workbook.xlsx.write(res);
  res.end();
});
