const express = require("express");
const router = express.Router();

// Import middleware if needed
const Middleware = require("../middleware/index.js");

// Import controllers
const {
    createPayslip,
    getAllPayslip,
    payslipupdatestatus,
    updatestatusinactive
} = require("../controllers/Payroll/index.js");
const middleware = require("../middleware/index.js");

// Define routes
router.post("/payslip", Middleware, createPayslip);              
router.get("/payslip-get-all", Middleware, getAllPayslip);  
router.put("/payslipupdatestatus/:id",Middleware,payslipupdatestatus)   
router.put("/update-status-delete/:id",middleware,updatestatusinactive)   

module.exports = router;