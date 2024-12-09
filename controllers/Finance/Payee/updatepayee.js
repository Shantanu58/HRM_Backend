// controllers/payee/updatePayee.js
const Payee = require('../../../models/Payee');

async function updatePayee(req, res) {
  const { payee_name, contact_number } = req.body;
  const payeeId = req.params.id;

  try {
    // Check if the payee exists
    const payee = await Payee.findById(payeeId);
    if (!payee) {
      return res.status(404).json({
        message: 'Payee not found',
      });
    }

    // Update the payee's information
    payee.payee_name = payee_name || payee.payee_name;
    payee.contact_number = contact_number || payee.contact_number;

    // Save the updated payee
    await payee.save();

    // Send success response
    res.status(200).json({
      message: 'Payee updated successfully',
      data: payee,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'An error occurred while updating the payee',
      error: err.message,
    });
  }
}

module.exports = updatePayee;
