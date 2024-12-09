const Joi = require('joi');

// Define the Joi schema for validation
const expenseValidationSchema = Joi.object({
  account_name: Joi.string()
    .trim()
    .max(100)
    .required()
    .messages({
      'string.empty': 'Account name is required',
      'string.max': 'Account name cannot exceed 100 characters',
    }),
  amount: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Amount must be a number',
      'number.min': 'Amount cannot be negative',
      'any.required': 'Amount is required',
    }),
  date: Joi.date()
    .required()
    .messages({
      'date.base': 'Date must be a valid date',
      'any.required': 'Date is required',
    }),
  category: Joi.string()
    .trim()
    .max(50)
    .required()
    .messages({
      'string.empty': 'Category is required',
      'string.max': 'Category cannot exceed 50 characters',
    }),
  payee_name: Joi.string()  // Changed from payer_name to payee_name
    .trim()
    .max(100)
    .required()
    .messages({
      'string.empty': 'Payee name is required',
      'string.max': 'Payee name cannot exceed 100 characters',
    }),
  payment_type: Joi.string()
    .trim()
    .max(30)
    .required()
    .messages({
      'string.empty': 'Payment type is required',
      'string.max': 'Payment type cannot exceed 30 characters',
    }),
  ref: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'Referral ID must be a number',
      'number.min': 'Referral ID cannot be negative',
      'any.required': 'Referral ID is required',
    }),
  description: Joi.string()
    .trim()
    .max(1000)
    .optional()
    .messages({
      'string.max': 'Description cannot exceed 1000 characters',
    }),
});

// Export the validation function
module.exports = expenseValidationSchema;
