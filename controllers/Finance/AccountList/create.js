const Account = require('../../../models/Finance'); // Assuming your MongoDB Account model is here
const AccountValidator = require('../../../validators/Finance/FinanceValidators'); // Assuming your Joi schema for Account is here

// Create a new account
async function create(req, res) {
  // Validate the request body using the Joi schema
  const { error } = AccountValidator.validate(req.body);

  // If validation fails, return a 400 error with validation details
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map(detail => detail.message).join(', '),
    });
  }

  const { account_name, initial_balance, account_number, branch_code, bank_branch } = req.body;

  try {
    // Create the new account entry with the provided data
    const newAccount = new Account({
      account_name,
      initial_balance,
      account_number,
      branch_code,
      bank_branch,
    });

    // Save the account record to the database
    await newAccount.save();

    // Send success response
    res.status(201).json({
      message: 'Account created successfully',
      data: newAccount,
    });
  } catch (error) {
    console.error(error);

    // Handle specific MongoDB errors (e.g., duplicate key error)
    if (error.code === 11000) { // Duplicate key error
      return res.status(400).json({
        message: 'Account creation failed',
        errors: 'Account number already exists',
      });
    }

    // Generic server error response
    res.status(500).json({
      message: 'An error occurred while creating the account',
      error: error.message,
    });
  }
}

module.exports = create; // Export the create function backend
