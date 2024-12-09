const Joi = require("joi");

const baseSchema = Joi.object({
  leaveType: Joi.string().valid("Casual Leave", "Medical Leave").messages({
    "any.only": "Leave type must be one of: Casual Leave or Medical Leave",
  }),
  appliedOn: Joi.date().messages({
    "date.base": "Applied on must be a valid date",
  }),
  startDate: Joi.date().messages({
    "date.base": "Start date must be a valid date",
  }),
  endDate: Joi.date().min(Joi.ref("startDate")).messages({
    "date.base": "End date must be a valid date",
    "date.min": "End date must be on or after the start date",
  }),
  totalDays: Joi.number().integer().positive().messages({
    "number.base": "Total days must be a number",
    "number.integer": "Total days must be an integer",
    "number.positive": "Total days must be a positive number",
  }),
  reason: Joi.string().min(5).messages({
    "string.base": "Reason must be a string",
    "string.min": "Reason must be at least 5 characters long",
  }),
});

const createSchema = baseSchema.keys({
  employeeId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.pattern.base":
        "Invalid employeeId format (must be a 24 character MongoDB ObjectId)",
    }),
});

const updateSchema = baseSchema.fork(
  ["leaveType", "startDate", "endDate", "reason"],
  (schema) => schema.optional()
);

const ManageLeaveValidator = {
  validateCreate: (data) => createSchema.validate(data, { abortEarly: false }),
  validateUpdate: (data) => updateSchema.validate(data, { abortEarly: false }),
};

module.exports = ManageLeaveValidator;
