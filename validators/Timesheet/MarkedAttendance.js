// // HRMGO-Backend\validators\Timesheet\MarkedAttendance.js

// const Joi = require("joi");

// const MarkedAttendanceValidator = Joi.object({
//   employeeId: Joi.string().required(),
//   date: Joi.date().iso().required(),
//   status: Joi.string().valid("Present", "Absent").required(),
//   clockIn: Joi.date().iso().required(),
//   clockOut: Joi.date().iso().required(),
//   late: Joi.date().iso().default(new Date("1970-01-01T00:00:00Z")),
//   earlyLeaving: Joi.date().iso().default(new Date("1970-01-01T00:00:00Z")),
//   overtime: Joi.date().iso().default(new Date("1970-01-01T00:00:00Z")),
//   branchId: Joi.string().required(),
//   departmentId: Joi.string().required(),
// });

// module.exports = MarkedAttendanceValidator;
// HRMGO-Backend\validators\Timesheet\MarkedAttendance.js

const Joi = require("joi");

const MarkedAttendanceValidator = Joi.object({
  employeeId: Joi.string().required(),
  date: Joi.date().iso().required(),
  status: Joi.string().valid("Present", "Absent").required(),
  clockIn: Joi.date().iso().required(),
  clockOut: Joi.date().iso().required(),
  late: Joi.date().iso().default(new Date("1970-01-01T00:00:00Z")),
  earlyLeaving: Joi.date().iso().default(new Date("1970-01-01T00:00:00Z")),
  overtime: Joi.date().iso().default(new Date("1970-01-01T00:00:00Z")),
});

module.exports = MarkedAttendanceValidator;
