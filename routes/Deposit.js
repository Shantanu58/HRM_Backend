const express = require("express");
const router = express.Router();

// Import middleware if needed
const Middleware = require("../middleware/index.js");

// Import controllers
const {
    createdeposite,
    deletedeposit,
    getalldeposit,
    updatedeposit
   
    // updatestatusinactive
} = require("../controllers/Finance/index1.js");
const middleware = require("../middleware/index.js");
// const Deposit = require("../models/Deposit.js");

// Define routes
// router.post("/Create-AccountList", Middleware, createAccountList);              
router.post("/create_deposit", Middleware, createdeposite); 
router.delete("/delete_deposit/:id", Middleware, deletedeposit);  
router.put("/update_deposit/:id", Middleware, updatedeposit);  
router.get("/getall_deposit", Middleware, getalldeposit); 

module.exports = router;