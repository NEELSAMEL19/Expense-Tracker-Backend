import { z } from "zod";

export const addIncomeSchema = z.object({
  icon: z.string().trim().optional(),
  source: z.string().trim().min(1, "Source is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  date: z.coerce.date({ errorMap: () => ({ message: "Invalid date" }) }),
});