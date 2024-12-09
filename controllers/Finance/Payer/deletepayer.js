const Payer = require('../../../models/Payer');

// Delete an account by ID
async function deletePayer(req, res) {
  const { id } = req.params; // Get the account ID from the request parameters

  try {
    // Find and delete the account by ID
    const deletedAccount = await Payer.findByIdAndDelete(id);

    // If no account is found, return a 404 response
    if (!deletedAccount) {
      return res.status(404).json({
        message: 'Payer not found',
      });
    }

    // Send success response
    res.status(200).json({
      message: 'Payer deleted successfully',
      data: deletedAccount, // Include the deleted account data if needed
    });
  } catch (error) {
    console.error(error);

    // Generic server error response
    res.status(500).json({
      message: 'An error occurred while deleting the Payer',
      error: error.message,
    });
  }
}

module.exports = deletePayer; // Export the delete function
