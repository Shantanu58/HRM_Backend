const express = require("express");
const router = express.Router();

// Import middleware if needed
const Middleware = require("../middleware/index.js");

// const { upload } = require('../middleware/upload.js');



// Import controllers
const {
      createticketreply,
      getticketreply,
     
} = require("../controllers/Ticket/index.js");
const middleware = require("../middleware/index.js");

// Define routes
router.post("/create_TicketReply", Middleware, createticketreply);  
router.get("/ticket-reply/:ticketId",middleware,getticketreply)            
 

module.exports = router;

