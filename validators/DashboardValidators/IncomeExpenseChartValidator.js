const Joi = require("joi");

const IncomeExpenseChartValidator = Joi.object({
  categories: Joi.date().required(),
  incomeData: Joi.number().required().min(0),
  expenseData: Joi.number().required().min(0),
});

module.exports = IncomeExpenseChartValidator;
