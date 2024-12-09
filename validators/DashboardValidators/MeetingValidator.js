const Joi = require("joi");

const MeetingValidator = Joi.object({
  title: Joi.string().required(), // Validates that the title is a non-empty string

  // Date field validation (ISO 8601 format date)
  date: Joi.date().required(), // Validates that the date is a valid Date object

  // Time field validation (12-hour format with AM/PM)
  time: Joi.string()
    .pattern(/^([1-9]|1[0-2]):[0-5][0-9] [APap][Mm]$/)
    .required(), // Validates time in 12-hour format, e.g., 3:20 PM
});

module.exports = MeetingValidator;
