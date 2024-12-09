const Account = require('../../../models/Finance'); // MongoDB Account model

// Fetch all accounts
async function getAllAccounts(req, res) {
  try {
    // Retrieve only account_name and initial_balance, excluding _id
    const accounts = await Account.find().select('account_name initial_balance -_id');

    // Log the data to verify
    console.log(accounts);

    // Send success response with retrieved data
    res.status(200).json({
      message: 'Accounts fetched successfully',
      data: accounts,
    });
  } catch (error) {
    console.error(error);

    // Generic server error response
    res.status(500).json({
      message: 'An error occurred while fetching accounts',
      error: error.message,
    });
  }
}

module.exports = getAllAccounts;
