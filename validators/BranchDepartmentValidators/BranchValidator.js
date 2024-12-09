const Joi = require("joi");

const BranchValidator = Joi.object({
  branchName: Joi.string().required(),
});

module.exports = BranchValidator;
