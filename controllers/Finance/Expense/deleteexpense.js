const Expense = require('../../../models/Expense'); // Changed to Expense model

// Delete an expense account by ID
async function deleteExpense(req, res) {
  const { id } = req.params; // Get the account ID from the request parameters

  try {
    // Find and delete the expense account by ID
    const deletedExpense = await Expense.findByIdAndDelete(id); // Changed Deposit to Expense

    // If no expense account is found, return a 404 response
    if (!deletedExpense) {
      return res.status(404).json({
        message: 'Expense not found', // Changed Deposit to Expense
      });
    }

    // Send success response
    res.status(200).json({
      message: 'Expense deleted successfully', // Changed Deposit to Expense
      data: deletedExpense, // Include the deleted expense data if needed
    });
  } catch (error) {
    console.error(error);

    // Generic server error response
    res.status(500).json({
      message: 'An error occurred while deleting the expense', // Changed Deposit to Expense
      error: error.message,
    });
  }
}

module.exports = deleteExpense; // Export deleteExpense instead of deletedeposit
