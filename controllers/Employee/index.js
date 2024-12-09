// Use require instead of import
const createEmployee = require("./Employee/create");
const getAllEmployee = require("./Employee/getAll");
const getAllName = require("./Employee/getAllName");
const getFilteredEmployees = require("./Employee/getFilteredEmployees");
const getByBranchDepartment = require("./Employee/getByBranchDepartment");
const getEmployeeNamebyid  =require("./Employee/getEmployeebyid")

module.exports = {
  createEmployee,
  getAllEmployee,
  getAllName,
  getFilteredEmployees,
  getByBranchDepartment,
  getEmployeeNamebyid
};



