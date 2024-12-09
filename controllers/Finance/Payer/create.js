// controllers/payeeController.js
const Payer = require('../../../models/Payer');
const payerValidator = require('../../../validators/Finance/PayerValidators');

async function createPayer(req, res) {
  const { error } = payerValidator.validate(req.body);

  // If validation fails, return a 400 error with validation details
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map(detail => detail.message).join(', '),
    });
  }

  const { payer_name, contact_number } = req.body;

  try {
    // Check if the payee already exists by contact_number
    const existingPayer = await Payer.findOne({ contact_number });
    if (existingPayer) {
      return res.status(400).json({
        message: 'Payer creation failed',
        errors: 'Payer with this contact number already exists',
      });
    }

    // Create a new Payee document
    const newPayer = new Payer({
      payer_name,
      contact_number
    });

    // Save the Payee document to the database
    await newPayer.save();

    // Send success response
    res.status(201).json({
      message: 'Payer created successfully',
      data: newPayer,
    });
  } catch (err) {
    console.error(err);

    // Handle database or other errors
    res.status(500).json({
      message: 'An error occurred while creating the payer',
      error: err.message,
    });
  }
}

module.exports =  createPayer ;