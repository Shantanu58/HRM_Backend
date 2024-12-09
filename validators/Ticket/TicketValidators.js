const Joi = require('joi');

// Joi validation schema for a ticket
const ticketValidationSchema = Joi.object({
  title: Joi.string().trim().required(), // Validate title as a required string
  employee_name: Joi.string().trim().required(), // Validate employee_name as a required string
  priority: Joi.string().valid('low', 'medium', 'high', 'critical').required(), // Enum for priority
  description: Joi.string().required(), // Validate description as a required string
  attachment: Joi.string().uri().optional(), // Validate attachment as a valid URI (optional)
  status: Joi.string().valid('open', 'close', 'onhold').default('close'), // Enum for status with default 'close'
  created_by: Joi.string().valid('HRM', 'Manager', 'Admin').default('HRM'), // Validate created_by with enum and default 'HRM'
  end_date: Joi.date().default(Date.now), // Validate end_date as a date, defaults to current date
});

// Function to validate ticket data using Joi
const validateTicket = (ticketData) => {
  return ticketValidationSchema.validate(ticketData);
};

module.exports = validateTicket;



// const Joi = require('joi');

// const ticketValidator = Joi.object({
//   title: Joi.string().required(),
//   employee_name: Joi.string().required(),
//   priority: Joi.string().valid('low', 'medium', 'high', 'critical').required(),
//   description: Joi.string().required(),
//   status: Joi.string().valid('open', 'close', 'onhold').default('close'),
//   end_date: Joi.date().required(),
//   attachment: Joi.string().uri().allow(null),  // Allow the attachment to be a URL string or null
// });

// module.exports = ticketValidator;

