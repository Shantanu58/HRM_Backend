const Account = require('../../../models/Finance');
const AccountValidator = require('../../../validators/Finance/FinanceValidators');

// Update an existing account by ID
async function update(req, res) {
  // Validate the request body using the Joi schema
  const { error } = AccountValidator.validate(req.body);

  // If validation fails, return a 400 error with validation details
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map(detail => detail.message),
    });
  }

  // Extract input data and ensure proper sanitization
  let { account_name, initial_balance, account_number, branch_code, bank_branch } = req.body;
  
  // Ensure account_number and branch_code are strings before calling trim
  if (typeof account_number === 'string') {
    account_number = account_number.trim();
  }
  
  if (typeof branch_code === 'string') {
    branch_code = branch_code.trim();
  }

  try {
    // Find the account by ID and update it
    const updatedAccount = await Account.findByIdAndUpdate(
      req.params.id, // The ID of the account to be updated (from the URL)
      { account_name, initial_balance, account_number, branch_code, bank_branch },
      { new: true } // Return the updated document
    );

    // If account not found, return 404
    if (!updatedAccount) {
      return res.status(404).json({
        message: 'Account not found',
        errors: 'No account found with the given ID',
      });
    }

    // Send success response with the updated account
    res.status(200).json({
      message: 'Account updated successfully',
      data: updatedAccount,
    });
  } catch (error) {
    console.error('Error updating account:', error);

    // Generic server error response
    res.status(500).json({
      message: 'An error occurred while updating the account',
      error: error.message,
    });
  }
}

module.exports = update;
