// routes/dashboard.js

const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createIncomeExpenseChart,
  getAllIncomeExpenseChart,
} = require("../controllers/Dashboard");

// Define routes
router.post("/income-expense-chart", Middleware, createIncomeExpenseChart);
router.get(
  "/income-expense-chart-get-all",
  Middleware,
  getAllIncomeExpenseChart
);

module.exports = router;
