const express = require("express");
const router = express.Router();

// Import middleware if needed
const Middleware = require("../middleware/index.js");

// Import controllers
const {
    createSetSalary,
    getSingleSetSalary,
    getAllSetSalary,
} = require("../controllers/Payroll/index.js");

// Define routes
router.post("/setsalary", Middleware, createSetSalary);              
router.get("/setsalary-get-all", Middleware, getAllSetSalary);       
router.get("/setsalary-get/:id", Middleware, getSingleSetSalary);    

module.exports = router;

