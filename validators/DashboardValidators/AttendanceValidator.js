const Joi = require("joi");

const AttendanceValidator = Joi.object({
  name: Joi.string().required(),
  status: Joi.string().required(),
});

module.exports = AttendanceValidator;
