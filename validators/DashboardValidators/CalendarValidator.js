const Joi = require("joi");

const CalendarValidator = Joi.object({
  title: Joi.string().required(),

  startDate: Joi.date().required(),

  endDate: Joi.date().required(),

  description: Joi.string().required(),

  color: Joi.string().required(),
});

module.exports = CalendarValidator;
