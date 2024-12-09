const Joi = require('joi');

const createAccountValidator = Joi.object({
  account_name: Joi.string().required().messages({
    'string.base': 'Account Name should be a valid string',
    'any.required': 'Account Name is required',
  }),
  initial_balance: Joi.number().min(0).required().messages({
    'number.base': 'Initial Balance should be a valid number',
    'number.min': 'Initial Balance must be a positive number',
    'any.required': 'Initial Balance is required',
  }),
  account_number: Joi.number().integer().required().messages({
    'number.base': 'Account Number should be a valid integer',
    'any.required': 'Account Number is required',
  }),
  branch_code: Joi.string().alphanum().required().messages({
    'string.base': 'Branch Code should be a valid alphanumeric string',
    'string.alphanum': 'Branch Code must only contain letters and numbers',
    'any.required': 'Branch Code is required',
  }),
  bank_branch: Joi.string().required().messages({
    'string.base': 'Bank Branch should be a valid string',
    'any.required': 'Bank Branch is required',
  }),
});

module.exports = createAccountValidator;

