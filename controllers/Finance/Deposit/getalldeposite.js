const Deposit = require('../../../models/Deposit'); // Import the Deposit model

// Fetch all deposits
async function getalldeposits(req, res) {
  try {
    // Retrieve all deposits from the database
    const deposits = await Deposit.find();  // You can apply filters if needed, e.g., to fetch based on a specific field

    // Send success response with retrieved data
    res.status(200).json({
      message: 'Deposits fetched successfully',
      data: deposits,
    });
  } catch (error) {
    console.error(error);

    // Generic server error response
    res.status(500).json({
      message: 'An error occurred while fetching deposits',
      error: error.message,
    });
  }
}

module.exports = getalldeposits;
