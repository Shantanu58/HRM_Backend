const express = require("express");
const router = express.Router();

// Import middleware if needed
const Middleware = require("../middleware/index.js");

// Import controllers
const {
    createexpense,
    deleteexpense,
    getallexpense,
    updateexpense
} = require("../controllers/Finance/index.js");
const middleware = require("../middleware/index.js");

// Define routes
router.post("/create_expense", Middleware, createexpense); 
router.delete("/delete_expense/:id", Middleware, deleteexpense);  
router.put("/update_expense/:id", Middleware, updateexpense);  
router.get("/getall_expense", Middleware, getallexpense); 

module.exports = router;
