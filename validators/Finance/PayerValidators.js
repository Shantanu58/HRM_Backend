// validation/payeeValidation.js
const Joi = require('joi');

// Joi validation schema for the Payee form
const payerValidationSchema = Joi.object({
  payer_name: Joi.string().min(3).required().messages({
    'string.empty': 'Payer Name is required',
    'string.min': 'Payer Name should have at least 3 characters'
  }),
  contact_number: Joi.string().pattern(/^\+\d{1,3}\d{9,13}$/).required().messages({
    'string.empty': 'Contact Number is required',
    'string.pattern.base': 'Please use the format: +<country_code><phone_number> (e.g., +91XXXXXXXXXX)'
  })
});

module.exports = payerValidationSchema ;