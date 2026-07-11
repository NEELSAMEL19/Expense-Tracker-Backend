import express from "express";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./common/middlewares/error.middleware.js";
import userRoutes from "./modules/auth/auth.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser()); // needed since protect reads req.cookies.token

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});

app.use("/api/auth", userRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
