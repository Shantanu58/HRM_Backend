const TransferBalance = require('../../../models/TransferBalance'); // Assuming the model is saved as TransferBalance.js
const transferBalanceValidator = require('../../../validators/Finance/TransferBalanceValidators'); // Changed to TransferBalanceValidator
const moment = require('moment'); // Import moment.js to handle date formatting

async function createTransferBalance(req, res) {
  const { error } = transferBalanceValidator.validate(req.body); // Validate with TransferBalanceValidator
  // If validation fails, return a 400 error with validation details
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map((detail) => detail.message).join(', '),
    });
  }

  const { fromAccountId, toAccountId, amount, date, paymentTypeId, referalId, description } = req.body;

  try {
    // Format the date to MM-DD-YYYY
    const formattedDate = moment(date, 'YYYY-MM-DD').format('MM-DD-YYYY');

    // Check if a transfer with the same referral ID (referalId) already exists
    const existingTransferBalance = await TransferBalance.findOne({ referalId });
    if (existingTransferBalance) {
      return res.status(400).json({
        message: 'Transfer balance creation failed',
        errors: 'Transfer balance with this referral ID already exists',
      });
    }

    // Create a new TransferBalance document
    const newTransferBalance = new TransferBalance({
      fromAccountId,
      toAccountId,
      amount,
      date: formattedDate, // Store the formatted date
      paymentTypeId,
      referalId,
      description,
    });

    // Save the TransferBalance document to the database
    await newTransferBalance.save();

    // Send success response
    res.status(201).json({
      message: 'Transfer balance created successfully',
      data: newTransferBalance,
    });
  } catch (err) {
    console.error(err);

    // Handle database or other errors
    res.status(500).json({
      message: 'An error occurred while creating the transfer balance',
      error: err.message,
    });
  }
}

module.exports = createTransferBalance; // Export createTransferBalance
