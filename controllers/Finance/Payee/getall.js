
const Payee = require('../../../models/Payee');

// Fetch all accounts
async function getall(req, res) {
  try {
    // Retrieve all accounts from the database
    const payee = await Payee.find();

    // Send success response with retrieved data
    res.status(200).json({
      message: 'Payee fetched successfully',
      data: payee,
    });
  } catch (error) {
    console.error(error);

    // Generic server error response
    res.status(500).json({
      message: 'An error occurred while fetching Payee',
      error: error.message,
    });
  }
}

module.exports = getall; 

