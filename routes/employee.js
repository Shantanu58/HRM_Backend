const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

// Controller imports
const {
  createEmployee,
  getAllEmployee,
  getAllName,
  getFilteredEmployees,
  getByBranchDepartment,
  getEmployeeNamebyid
} = require("../controllers/Employee");

// Define routes
router.post("/employee", Middleware, createEmployee);
router.get("/employee-get-all", Middleware, getAllEmployee);
router.get("/employee-get-all-name", Middleware, getAllName);
router.get("/employee-get-filter", Middleware, getFilteredEmployees);
router.get(
  "/employee-get-by-branch-department",
  Middleware,
  getByBranchDepartment
);
router.get('/getemployeeemployee/:id', getEmployeeNamebyid);

module.exports = router;
