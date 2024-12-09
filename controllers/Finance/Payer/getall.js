const Payer = require('../../../models/Payer');

// Fetch all accounts
async function getAll(req, res) {
  try {
    // Retrieve all accounts from the database
    const payer = await Payer.find();

    // Send success response with retrieved data
    res.status(200).json({
      message: 'Payers fetched successfully',
      data: payer,
    });
  } catch (error) {
    console.error(error);

    // Generic server error response
    res.status(500).json({
      message: 'An error occurred while fetching Payers',
      error: error.message,
    });
  }
}

module.exports = getAll;
