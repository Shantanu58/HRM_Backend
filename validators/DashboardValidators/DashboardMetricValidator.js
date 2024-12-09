const Joi = require("joi");

const DashboardMetricValidator = Joi.object({
  title: Joi.string().required(),
  subtitle: Joi.string().required(),
  value: Joi.number().required(),
});

module.exports = DashboardMetricValidator;
