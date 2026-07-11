import Income from "../../models/Income.js";
import AppError from "../../common/utils/AppError.js";
import ExcelJS from "exceljs";

export const addIncomeService = async ({
  userId,
  icon,
  source,
  amount,
  date,
}) => {
  const income = await Income.create({ userId, icon, source, amount, date });
  return income;
};

export const getAllIncomeService = async (userId) => {
  return Income.find({ userId }).sort({ date: -1 });
};

export const deleteIncomeService = async ({ incomeId, userId }) => {
  const income = await Income.findById(incomeId);
  if (!income) throw new AppError("Income not found", 404);
  if (income.userId.toString() !== userId.toString())
    throw new AppError("Unauthorized", 403);

  await income.deleteOne();
};

export const generateIncomeExcelBuffer = async (userId) => {
  const incomes = await Income.find({ userId }).sort({ date: -1 });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Incomes");
  sheet.addRow(["Source", "Amount", "Date"]);
  incomes.forEach((i) => sheet.addRow([i.source, i.amount, i.date]));

  return workbook;
};
