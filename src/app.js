import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});

export default app;