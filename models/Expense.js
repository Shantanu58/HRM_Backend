const mongoose = require('mongoose');

// Define the schema for the Expense model
const expenseSchema = new mongoose.Schema(
  {
    // Account Name, stored as a string and required
    account_name: {
      type: String,
      required: [true, 'Account name is required'],
      trim: true, // Remove leading/trailing spaces
      maxlength: [100, 'Account name cannot exceed 100 characters'], // Adjust length as needed
    },

    // Amount of the expense
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },

    // Date of the expense
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now, // Default to the current date if not provided
    },

    // Category as a string (e.g., 'Project', 'Extra Income')
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      maxlength: [50, 'Category cannot exceed 50 characters'], // Adjust length as needed
    },

    // Payee Name, stored as a string and required (replacing payer_name)
    payee_name: {
      type: String,
      required: [true, 'Payee name is required'],
      trim: true,
      maxlength: [100, 'Payee name cannot exceed 100 characters'], // Adjust length as needed
    },

    // Payment Type (e.g., 'Cash', 'Bank Transfer')
    payment_type: {
      type: String,
      required: [true, 'Payment type is required'],
      trim: true,
      maxlength: [30, 'Payment type cannot exceed 30 characters'], // Adjust length as needed
    },

    // Referral ID as a unique number
    ref: {
      type: Number,
      unique: true, // Enforce uniqueness
      required: [true, 'Referral ID is required'],
      min: [0, 'Referral ID cannot be negative'], // Optional validation for non-negative numbers
    },

    // Description for additional information
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'], // Adjust length as needed
      default: '', // Default to an empty string if not provided
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the Expense model based on the schema
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
