const Joi = require("joi");

const meetingsValidator = Joi.object({
  title: Joi.string().required().messages({
    "string.base": `"title" should be a type of 'string'`,
    "any.required": `"title" is a required field`,
  }),
  branchId: Joi.string().required().messages({
    "string.base": `"branchId" should be a type of 'string'`,
    "any.required": `"branchId" is a required field`,
  }),
  departmentId: Joi.array().items(Joi.string()).min(1).required().messages({
    "array.base": `"departmentId" should be an array of strings`,
    "array.min": `"departmentId" must have at least one department`,
    "any.required": `"departmentId" is a required field`,
  }),
  employeeIds: Joi.array().items(Joi.string()).min(1).required().messages({
    "array.base": `"employeeIds" should be an array of strings`,
    "array.min": `"employeeIds" must have at least one employee`,
    "any.required": `"employeeIds" is a required field`,
  }),
  date: Joi.date().required().messages({
    "date.base": `"date" should be a valid date`,
    "any.required": `"date" is a required field`,
  }),
  time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/).required().messages({
    "string.base": `"time" should be a type of 'string'`,
    "string.pattern.base": `"time" should be in the format HH:mm (e.g., 14:30)`,
    "any.required": `"time" is a required field`,
  }),
  note: Joi.string().optional().messages({
    "string.base": `"note" should be a type of 'string'`,
  }),
});

module.exports = meetingsValidator;
