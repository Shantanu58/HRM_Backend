const express = require("express");
const router = express.Router();

// Import middleware if needed
const Middleware = require("../middleware/index.js");

// Import controllers
const {
    getaccountNameandBalance
   
    // updatestatusinactive
} = require("../controllers/Finance/index1.js");
const middleware = require("../middleware/index.js");

// Define routes
// router.post("/Create-AccountList", Middleware, createAccountList);              
router.get("/getAccount-Name-Balance", Middleware, getaccountNameandBalance);  
// router.put("/update-AccountList/:id",Middleware,updateAccountList);  
// router.delete("/delete-AccountList/:id", Middleware, deleteAccount);
// router.put("/update-status-delete/:id",middleware,updatestatusinactive)   

module.exports = router;