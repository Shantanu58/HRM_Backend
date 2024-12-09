const Joi = require('joi');

const attachmentTicketValidator = Joi.object({
  ticketId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/) // Regular expression for MongoDB ObjectId
    .required()
    .messages({
      'string.base': 'ticketId must be a valid ObjectId string',
      'string.pattern.base': 'ticketId must be a valid ObjectId format',
      'any.required': 'ticketId is required',
    }),
  
  description: Joi.string()
    .required()
    .messages({
      'string.base': 'Description must be a string',
      'any.required': 'Description is required',
    }),

  attachment: Joi.string()
    .optional() // Attachment is optional
    .allow(null) // Allow null if no attachment is provided
    .messages({
      'string.base': 'Attachment must be a string',
    }),

  createdAt: Joi.date()
    .optional()  // Optional in case it's passed explicitly, otherwise defaults to now
    .default(new Date())  // This ensures that the default value is a new Date object
    .messages({
      'date.base': 'createdAt must be a valid date',
    }),

  updatedAt: Joi.date()
    .optional()  // Optional in case it's passed explicitly, otherwise defaults to now
    .default(new Date())  // This ensures that the default value is a new Date object
    .messages({
      'date.base': 'updatedAt must be a valid date',
    }),
});

module.exports = attachmentTicketValidator;
