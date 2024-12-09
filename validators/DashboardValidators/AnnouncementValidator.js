const Joi = require("joi");

const AnnouncementValidator = Joi.object({
  title: Joi.string().required(), // Validates that the title is a non-empty string

  // Date field validation (ISO 8601 format date)
  startDate: Joi.date().required(), // Validates that the date is a valid Date object

  endDate: Joi.date().required(),

  description: Joi.string().required(),
});

module.exports = AnnouncementValidator;
