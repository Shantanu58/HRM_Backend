const mongoose = require('mongoose');

// Define the schema for the transfer balance
const transferBalanceSchema = new mongoose.Schema({
  fromAccountId: {
    type: String, // Assuming account name is a string, adjust if needed
    required: true,
  },
  toAccountId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now, // If no date is provided, default to current date
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentTypeId: {
    type: String,
    required: true,
    enum: ['Cash', 'Bank'], // You can add more payment types here if needed
  },
  referalId: {
    type: Number,
    unique: true, // Enforce uniqueness
    required: [true, 'Referral ID is required'],
    min: [0, 'Referral ID cannot be negative'], // Optional, no value will be set if not provided
  },
  description: {
    type: String,
    default: '', // Optional, no value will be set if not provided
  },
});

// Create the model from the schema
const TransferBalance = mongoose.model('TransferBalance', transferBalanceSchema);

// Export the model
module.exports = TransferBalance;
