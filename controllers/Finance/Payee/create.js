// controllers/payeeController.js
const Payee = require('../../../models/Payee');
const payeeValidator = require('../../../validators/Finance/PayeeValidators');

async function createPayee(req, res) {
  const { error } = payeeValidator.validate(req.body);

  // If validation fails, return a 400 error with validation details
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map(detail => detail.message).join(', '),
    });
  }

  const { payee_name, contact_number } = req.body;

  try {
    // Check if the payee already exists by contact_number
    const existingPayee = await Payee.findOne({ contact_number });
    if (existingPayee) {
      return res.status(400).json({
        message: 'Payee creation failed',
        errors: 'Payee with this contact number already exists',
      });
    }

    // Create a new Payee document
    const newPayee = new Payee({
      payee_name,
      contact_number
    });

    // Save the Payee document to the database
    await newPayee.save();

    // Send success response
    res.status(201).json({
      message: 'Payee created successfully',
      data: newPayee,
    });
  } catch (err) {
    console.error(err);

    // Handle database or other errors
    res.status(500).json({
      message: 'An error occurred while creating the payee',
      error: err.message,
    });
  }
}

module.exports =  createPayee ;
