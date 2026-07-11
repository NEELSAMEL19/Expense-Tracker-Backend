import { z } from "zod";

export const addExpenseSchema = z.object({
  icon: z.string().trim().optional(),
  category: z.string().trim().min(1, "Category is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  date: z.coerce.date({ errorMap: () => ({ message: "Invalid date" }) }),
});