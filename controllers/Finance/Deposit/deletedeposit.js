const Deposit = require('../../../models/Deposit');

// Delete a deposit account by ID
async function deletedeposit(req, res) {
  const { id } = req.params; // Get the account ID from the request parameters

  try {
    // Find and delete the deposit account by ID
    const deletedDeposit = await Deposit.findByIdAndDelete(id);

    // If no deposit account is found, return a 404 response
    if (!deletedDeposit) {
      return res.status(404).json({
        message: 'Deposit not found',
      });
    }

    // Send success response
    res.status(200).json({
      message: 'Deposit deleted successfully',
      data: deletedDeposit, // Include the deleted deposit data if needed
    });
  } catch (error) {
    console.error(error);

    // Generic server error response
    res.status(500).json({
      message: 'An error occurred while deleting the Deposit',
      error: error.message,
    });
  }
}

module.exports = deletedeposit; // Export the delete function
