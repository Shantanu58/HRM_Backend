const express = require("express");
const router = express.Router();

// Import middleware if needed
const Middleware = require("../middleware/index.js");

// Import controllers
const {
    createTransferBalance,
    deleteTransferBalance,
    getAllTransferBalances,
    updateTransferBalance
} = require("../controllers/Finance/index.js");
const middleware = require("../middleware/index.js");

// Define routes
router.post("/create_transferbalance", Middleware, createTransferBalance); 
router.delete("/delete_transferbalance/:id", Middleware, deleteTransferBalance);  
router.put("/update_transferbalance/:id", Middleware, updateTransferBalance);  
router.get("/getall_transferbalance", Middleware, getAllTransferBalances); 

module.exports = router;
