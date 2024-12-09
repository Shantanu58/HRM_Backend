const Deposit = require('../../../models/Deposit');
const depositeValidator = require('../../../validators/Finance/DepositeValidators');
const moment = require('moment'); // Import moment.js to handle date formatting

async function createdeposit(req, res) {
    const { error } = depositeValidator.validate(req.body);
  // If validation fails, return a 400 error with validation details
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map((detail) => detail.message).join(', '),
    });
  }

  const { account_name, amount, date, category, payer_name, payment_type, ref, description } = req.body;

  try {
    // Format the date to MM-DD-YYYY
    const formattedDate = moment(date, 'YYYY-MM-DD').format('MM-DD-YYYY');

    // Check if a deposit with the same referral ID (ref) already exists
    const existingDeposit = await Deposit.findOne({ ref });
    if (existingDeposit) {
      return res.status(400).json({
        message: 'Deposit creation failed',
        errors: 'Deposit with this referral ID already exists',
      });
    }

    // Create a new Deposit document
    const newDeposit = new Deposit({
      account_name,
      amount,
      date: formattedDate, // Store the formatted date
      category,
      payer_name,
      payment_type,
      ref,
      description,
    });

    // Save the Deposit document to the database
    await newDeposit.save();

    // Send success response
    res.status(201).json({
      message: 'Deposit created successfully',
      data: newDeposit,
    });
  } catch (err) {
    console.error(err);

    // Handle database or other errors
    res.status(500).json({
      message: 'An error occurred while creating the deposit',
      error: err.message,
    });
  }
}

module.exports = createdeposit;
