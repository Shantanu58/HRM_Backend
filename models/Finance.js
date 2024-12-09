const mongoose = require('mongoose');

// Define Account schema
const accountSchema = new mongoose.Schema({
  account_name: {
    type: String,
    required: true,
    trim: true,
  },
  initial_balance: {
    type: Number,
    required: true,
    min: 0,
  },
  account_number: {
    type: Number,
    required: true,
    unique: true,
  },
  branch_code: {
    type: String,
    required: true,
    trim: true,
  },
  bank_branch: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, 
});

// Create Account model
const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
