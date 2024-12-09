const IncomeExpenseChart = require("../../../models/IncomeExpenseChart");

async function getAll(req, res) {
  try {
    const { start_month, end_month } = req.query;

    if (!start_month || !end_month) {
      return res.status(400).json({
        hasError: true,
        message: "Start month and end month are required",
      });
    }

    // Convert the months to Date objects
    const startDate = new Date(start_month);
    const endDate = new Date(end_month);
    endDate.setMonth(endDate.getMonth() + 1);

    // Fetch the data for the selected date range
    const incomeExpenseData = await IncomeExpenseChart.aggregate([
      {
        $match: {
          categories: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $project: {
          _id: 0,
          categories: 1,
          incomeData: 1,
          expenseData: 1,
        },
      },
      {
        $sort: { categories: 1 }, // Sort by categories (month)
      },
    ]);

    if (!incomeExpenseData.length) {
      return res.status(404).json({
        hasError: true,
        message: "No data found for the selected date range",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Income Expense Chart fetched successfully",
      data: incomeExpenseData,
    });
  } catch (error) {
    console.error("Error fetching IncomeExpenseChart data:", error.message);
    return res.status(500).json({ hasError: true, message: "Server error" });
  }
}

module.exports = getAll;
