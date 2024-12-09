// controllers/payer/updatePayer.js
const Payer = require('../../../models/Payer');

async function updatePayer(req, res) {
  const { payer_name, contact_number } = req.body;
  const payerId = req.params.id;

  try {
    // Check if the payer exists
    const payer = await Payer.findById(payerId);
    if (!payer) {
      return res.status(404).json({
        message: 'Payer not found',
      });
    }

    // Update the payer's information
    payer.payer_name = payer_name || payer.payer_name;
    payer.contact_number = contact_number || payer.contact_number;

    // Save the updated payer
    await payer.save();

    // Send success response
    res.status(200).json({
      message: 'Payer updated successfully',
      data: payer,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'An error occurred while updating the payer',
      error: err.message,
    });
  }
}

module.exports = updatePayer;
