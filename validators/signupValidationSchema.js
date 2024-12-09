const Joi = require("joi");

const signupValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("company", "hr", "employee").required(),
});

module.exports = signupValidationSchema;
