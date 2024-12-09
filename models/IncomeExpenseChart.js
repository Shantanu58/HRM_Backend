// HRMGO-Backend\models\IncomeExpenseChart.js
const mongoose = require("mongoose");

const IncomeExpenseChartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    categories: {
      type: Date,
      required: true,
    },
    incomeData: {
      type: Number,
      required: true,
    },
    expenseData: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const IncomeExpenseChart = mongoose.model(
  "IncomeExpenseChart",
  IncomeExpenseChartSchema
);

module.exports = IncomeExpenseChart;
