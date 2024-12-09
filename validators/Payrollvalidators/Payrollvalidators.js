const Joi = require('joi');

// Validation schema for creating a payroll
const createPayrollValidator = Joi.object({
  employeeId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.base': 'Employee ID should be a valid string',
    'any.required': 'Employee ID is required',
    'string.pattern.base': 'Employee ID should be a valid MongoDB ObjectId'
  }),
  payrollType: Joi.string().valid('Monthly Payslip', 'Hourly Payslip').required().messages({
    'string.base': 'Payroll type should be a string',
    'any.required': 'Payroll type is required',
    'any.only': 'Payroll type should be either "Monthly Payslip" or "Hourly Payslip"'
  }),
  salary: Joi.number().required().min(0).precision(2).messages({
    'number.base': 'Salary should be a number',
    'any.required': 'Salary is required',
    'number.min': 'Salary must be a positive number',
    'number.precision': 'Salary can only have up to 2 decimal places'
  }),
  netSalary: Joi.number().required().min(0).precision(2).messages({
    'number.base': 'Net Salary should be a number',
    'any.required': 'Net Salary is required',
    'number.min': 'Net Salary must be a positive number',
    'number.precision': 'Net Salary can only have up to 2 decimal places'
  }),
  status: Joi.string().valid('paid', 'unpaid', 'inactive').required().messages({
    'string.base': 'Status should be a string',
    'any.required': 'Status is required',
    'any.only': 'Status should be either "paid", "unpaid", or "inactive"'
  }),
  paydate: Joi.date().required().messages({
    'date.base': 'Paydate should be a valid date',
    'any.required': 'Paydate is required'
  }),
  month: Joi.number().min(1).max(12).required().messages({
    'number.base': 'Month should be a number between 1 and 12',
    'any.required': 'Month is required',
    'number.min': 'Month must be between 1 and 12',
    'number.max': 'Month must be between 1 and 12'
  }),
  year: Joi.number().required().messages({
    'number.base': 'Year should be a valid number',
    'any.required': 'Year is required'
  })
});

module.exports = createPayrollValidator;
