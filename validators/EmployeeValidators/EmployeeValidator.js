const Joi = require("joi");

const EmployeeValidator = Joi.object({
  name: Joi.string().min(3).max(50).required(),

  email: Joi.string().email().required(),

  branchId: Joi.string().required(),

  departmentId: Joi.string().required(),

  designation: Joi.string().min(3).max(100).required(),

  joiningDate: Joi.date().required(),
});

module.exports = EmployeeValidator;
