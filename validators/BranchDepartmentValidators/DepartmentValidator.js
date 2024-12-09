const Joi = require("joi");

const DepartmentValidator = Joi.object({
  departmentName: Joi.string().required(),
  branchId: Joi.string().required(),
});

module.exports = DepartmentValidator;
