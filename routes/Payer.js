const express = require("express");
const router = express.Router();

// Import middleware if needed
const Middleware = require("../middleware/index.js");

// Import controllers
const {
    createpayer,
    deletepayer,
    getallpayer,
    updatepayer
   
    // updatestatusinactive
} = require("../controllers/Finance/index1.js");
const middleware = require("../middleware/index.js");

            
router.post("/create_Payer", Middleware, createpayer);  
router.delete("/delete_Payer/:id", Middleware, deletepayer);  
router.put("/update_Payer/:id", Middleware, updatepayer);  
router.get("/getall_Payer", Middleware, getallpayer);


module.exports = router;