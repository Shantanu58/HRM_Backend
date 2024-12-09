// HRMGO-Backend\controllers\Dashboard\IncomeExpenseChart\create.js

const IncomeExpenseChart = require("../../../models/IncomeExpenseChart");
const IncomeExpenseChartValidator = require("../../../validators/DashboardValidators/IncomeExpenseChartValidator");

async function create(req, res) {
  try {
    const { incomeData, expenseData, categories } = req.body;
    const userId = req.user.id;

    // Validate the IncomeExpenseChart data using the validator
    const { error } = IncomeExpenseChartValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ hasError: true, message: errorMessages });
    }

    // Create a new IncomeExpenseChart with the validated data
    const newIncomeExpenseChart = new IncomeExpenseChart({
      incomeData,
      expenseData,
      categories,
      userId,
    });

    // Save the IncomeExpenseChart to the database
    await newIncomeExpenseChart.save();

    return res.status(201).json({
      hasError: false,
      message: "Income Expense Chart created successfully",
      data: newIncomeExpenseChart,
    });
  } catch (error) {
    console.error("Error creating IncomeExpenseChart:", error.message);
    return res.status(500).json({ hasError: true, message: "Server error" });
  }
}

module.exports = create;
