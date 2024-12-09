const Deposit = require('../../../models/Deposit'); // Import the Deposit model
const depositeValidator = require('../../../validators/Finance/DepositeValidators'); // Import the Joi validator

async function updatedeposit(req, res) {
  const { id } = req.params; // Extract ID from request parameters
  const { error } = depositeValidator.validate(req.body); // Validate the incoming data

  // If validation fails, return a 400 error with validation details
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map((detail) => detail.message).join(', '),
    });
  }

  const { account_name, amount, date, category, payer_name, payment_type, ref, description } = req.body;

  try {
    // Check if the deposit exists
    const existingDeposit = await Deposit.findById(id);
    if (!existingDeposit) {
      return res.status(404).json({
        message: 'Deposit not found',
      });
    }

    // Check if the `ref` is being updated and already exists for another record
    if (ref && ref !== existingDeposit.ref) {
      const refExists = await Deposit.findOne({ ref });
      if (refExists) {
        return res.status(400).json({
          message: 'Update failed',
          errors: 'Another deposit with this referral ID already exists',
        });
      }
    }

    // Update the deposit record
    existingDeposit.account_name = account_name || existingDeposit.account_name;
    existingDeposit.amount = amount || existingDeposit.amount;
    existingDeposit.date = date || existingDeposit.date;
    existingDeposit.category = category || existingDeposit.category;
    existingDeposit.payer_name = payer_name || existingDeposit.payer_name;
    existingDeposit.payment_type = payment_type || existingDeposit.payment_type;
    existingDeposit.ref = ref || existingDeposit.ref;
    existingDeposit.description = description || existingDeposit.description;

    // Save the updated document
    const updatedDeposit = await existingDeposit.save();

    // Send success response
    res.status(200).json({
      message: 'Deposit updated successfully',
      data: updatedDeposit,
    });
  } catch (err) {
    console.error(err);

    // Handle database or other errors
    res.status(500).json({
      message: 'An error occurred while updating the deposit',
      error: err.message,
    });
  }
}

module.exports = updatedeposit;
