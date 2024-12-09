const Joi = require('joi');

const transferBalanceValidationSchema = Joi.object({
  fromAccountId: Joi.string().required().messages({
    'string.base': 'From Account is required',
    'any.required': 'From Account is required',
  }),
  toAccountId: Joi.string().required().messages({
    'string.base': 'To Account is required',
    'any.required': 'To Account is required',
  }),
  date: Joi.date().required().messages({
    'date.base': 'Date is required',
    'any.required': 'Date is required',
  }),
  amount: Joi.number().positive().required().messages({
    'number.base': 'Amount must be a number',
    'number.positive': 'Amount must be a positive number',
    'any.required': 'Amount is required',
  }),
  paymentTypeId: Joi.string().valid('Cash', 'Bank').required().messages({
    'string.base': 'Payment Method is required',
    'any.required': 'Payment Method is required',
    'any.only': 'Payment Method must be either Cash or Bank',
  }),
  referalId: Joi.number()
  .integer()
  .min(0)
  .required()
  .messages({
    'number.base': 'Referral ID must be a number',
    'number.min': 'Referral ID cannot be negative',
    'any.required': 'Referral ID is required',
  }),
  description: Joi.string().optional().messages({
    'string.base': 'Description should be a string',
  }),
});

module.exports = transferBalanceValidationSchema;
