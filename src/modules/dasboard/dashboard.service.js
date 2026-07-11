import mongoose from "mongoose";
import Income from "../../models/Income.js";
import Expense from "../../models/Expense.js";

export const getDashboardDataService = async (userId) => {
  const objectId = new mongoose.Types.ObjectId(userId);

  const [totalIncomeAgg, totalExpenseAgg, recentIncome, recentExpense] =
    await Promise.all([
      Income.aggregate([
        { $match: { userId: objectId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Expense.aggregate([
        { $match: { userId: objectId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Income.find({ userId: objectId })
        .sort({ date: -1 })
        .limit(3)
        .select("icon source amount date")
        .lean(),
      Expense.find({ userId: objectId })
        .sort({ date: -1 })
        .limit(3)
        .select("icon category amount date")
        .lean(),
    ]);

  const recentTransactions = [
    ...recentIncome.map((i) => ({ ...i, type: "income" })),
    ...recentExpense.map((e) => ({ ...e, type: "expense" })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const totalIncome = totalIncomeAgg[0]?.total || 0;
  const totalExpense = totalExpenseAgg[0]?.total || 0;

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    recentTransactions,
  };
};
