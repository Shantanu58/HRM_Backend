// HRMGO-Backend/controllers/Finance/TransferBalance/getAll.js

const TransferBalanceModel = require('../../../models/TransferBalance'); // Assuming you have this model

const getAllTransferBalances = async (req, res) => {
  try {
    const transferBalances = await TransferBalanceModel.find(); // Fetching all transfer balances from the database

    if (transferBalances.length === 0) {
      return res.status(404).json({
        message: 'No transfer balances found',
      });
    }

    res.status(200).json({
      message: 'Transfer balances retrieved successfully',
      data: transferBalances,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message,
    });
  }
};

module.exports = getAllTransferBalances;
