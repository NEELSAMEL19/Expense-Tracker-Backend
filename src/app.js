import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  notFound,
  errorHandler,
} from "./common/middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import incomeRoutes from "./modules/income/income.routes.js";
import expenseRoutes from "./modules/expenses/expense.routes.js";
import dashboardRoutes from "./modules/dasboard/dashboard.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL, // your Vercel frontend URL
    credentials: true, // needed since you're using cookies for auth
  }),
);

app.use(express.json());
app.use(cookieParser()); // needed since protect reads req.cookies.token

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
