import Expense from "../../models/Expense.js";
import AppError from "../../common/utils/AppError.js";
import ExcelJS from "exceljs";

export const addExpenseService = async ({
  userId,
  icon,
  category,
  amount,
  date,
}) => {
  const expense = await Expense.create({
    userId,
    icon,
    category,
    amount,
    date,
  });
  return expense;
};

export const getAllExpenseService = async (userId) => {
  return Expense.find({ userId }).sort({ date: -1 });
};

export const deleteExpenseService = async ({ expenseId, userId }) => {
  const expense = await Expense.findById(expenseId);
  if (!expense) throw new AppError("Expense not found", 404);
  if (expense.userId.toString() !== userId.toString())
    throw new AppError("Unauthorized", 403);

  await expense.deleteOne();
};

export const generateExpenseExcelBuffer = async (userId) => {
  const expenses = await Expense.find({ userId }).sort({ date: -1 });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Expenses");
  sheet.addRow(["Category", "Amount", "Date"]);
  expenses.forEach((e) => sheet.addRow([e.category, e.amount, e.date]));

  return workbook;
};
