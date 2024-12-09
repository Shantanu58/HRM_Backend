const TransferBalance = require('../../../models/TransferBalance'); // Changed to TransferBalance model

// Delete a transfer balance by ID
async function deleteTransferBalance(req, res) {
  const { id } = req.params; // Get the account ID from the request parameters

  try {
    // Find and delete the transfer balance by ID
    const deletedTransferBalance = await TransferBalance.findByIdAndDelete(id); // Changed Expense to TransferBalance

    // If no transfer balance is found, return a 404 response
    if (!deletedTransferBalance) {
      return res.status(404).json({
        message: 'Transfer balance not found', // Changed Expense to Transfer Balance
      });
    }

    // Send success response
    res.status(200).json({
      message: 'Transfer balance deleted successfully', // Changed Expense to Transfer Balance
      data: deletedTransferBalance, // Include the deleted transfer balance data if needed
    });
  } catch (error) {
    console.error(error);

    // Generic server error response
    res.status(500).json({
      message: 'An error occurred while deleting the transfer balance', // Changed Expense to Transfer Balance
      error: error.message,
    });
  }
}

module.exports = deleteTransferBalance; // Export deleteTransferBalance instead of deleteExpense
