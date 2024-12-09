const express = require("express");
const router = express.Router();

// Import middleware if needed
const Middleware = require("../middleware/index.js");

// Import controllers
const {
    createpayee,
    deletepayee,
    getallpayee,
    updatepayee
   
    // updatestatusinactive
} = require("../controllers/Finance/index1.js");
const middleware = require("../middleware/index.js");

// Define routes
// router.post("/Create-AccountList", Middleware, createAccountList);              
router.post("/create_Payee", Middleware, createpayee);  
router.delete("/delete_Payee/:id", Middleware, deletepayee);  
router.put("/update_Payee/:id", Middleware, updatepayee);  
router.get("/getall_Payee", Middleware, getallpayee);
// router.put("/update-AccountList/:id",Middleware,updateAccountList);  
// router.delete("/delete-AccountList/:id", Middleware, deleteAccount);
// router.put("/update-status-delete/:id",middleware,updatestatusinactive)   

module.exports = router;