const Expense = require('../../../models/Expense'); // Import the Expense model

// Fetch all expenses
async function getallexpenses(req, res) {
  try {
    // Retrieve all expenses from the database
    const expenses = await Expense.find();  // You can apply filters if needed, e.g., to fetch based on a specific field

    // Send success response with retrieved data
    res.status(200).json({
      message: 'Expenses fetched successfully', // Changed Deposits to Expenses
      data: expenses, // Changed deposits to expenses
    });
  } catch (error) {
    console.error(error);

    // Generic server error response
    res.status(500).json({
      message: 'An error occurred while fetching expenses', // Changed deposits to expenses
      error: error.message,
    });
  }
}

module.exports = getallexpenses; // Export getallexpenses instead of getalldeposits
