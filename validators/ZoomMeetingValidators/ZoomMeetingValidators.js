const Joi = require('joi');

const zoomMeetingValidator = Joi.object({
  title: Joi.string().required(),
  employeeNames: Joi.array().items(Joi.string().required()).required(),
  start_date: Joi.date().required(),
  duration: Joi.number().required(),
  password: Joi.string().optional(),
  join_url: Joi.string().uri().optional().allow(''),
  status: Joi.string()
    .valid("Starting", "Waiting", "End")
    .default("Waiting"),
});

module.exports = zoomMeetingValidator;
