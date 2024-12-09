const TransferBalance = require('../../../models/TransferBalance'); // Import TransferBalance model
const transferBalanceValidator = require('../../../validators/Finance/TransferBalanceValidators'); // Import TransferBalanceValidator

async function updateTransferBalance(req, res) {
  const { id } = req.params; // Extract the ID from request parameters
  const { error } = transferBalanceValidator.validate(req.body); // Validate the incoming data

  // If validation fails, return a 400 error with validation details
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map((detail) => detail.message).join(', '),
    });
  }

  const { fromAccountId, toAccountId, amount, date, paymentTypeId, referalId, description } = req.body;

  try {
    // Check if the transfer balance exists
    const existingTransferBalance = await TransferBalance.findById(id);
    if (!existingTransferBalance) {
      return res.status(404).json({
        message: 'Transfer balance not found',
      });
    }

    // Check if the `referalId` is being updated and already exists for another record
    if (referalId && referalId !== existingTransferBalance.referalId) {
      const refExists = await TransferBalance.findOne({ referalId });
      if (refExists) {
        return res.status(400).json({
          message: 'Update failed',
          errors: 'Another transfer balance with this referral ID already exists',
        });
      }
    }

    // Update the transfer balance record
    existingTransferBalance.fromAccountId = fromAccountId || existingTransferBalance.fromAccountId;
    existingTransferBalance.toAccountId = toAccountId || existingTransferBalance.toAccountId;
    existingTransferBalance.amount = amount || existingTransferBalance.amount;
    existingTransferBalance.date = date || existingTransferBalance.date;
    existingTransferBalance.paymentTypeId = paymentTypeId || existingTransferBalance.paymentTypeId;
    existingTransferBalance.referalId = referalId || existingTransferBalance.referalId;
    existingTransferBalance.description = description || existingTransferBalance.description;

    // Save the updated document
    const updatedTransferBalance = await existingTransferBalance.save();

    // Send success response
    res.status(200).json({
      message: 'Transfer balance updated successfully',
      data: updatedTransferBalance,
    });
  } catch (err) {
    console.error(err);

    // Handle database or other errors
    res.status(500).json({
      message: 'An error occurred while updating the transfer balance',
      error: err.message,
    });
  }
}

module.exports = updateTransferBalance; // Export updateTransferBalance
