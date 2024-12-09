const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const { createMeetings,
    getAllMeetings,
    deleteMeetings,
    updatemeetings

} 
= require("../controllers/Meetings/index.js");
const middleware = require("../middleware/index.js");


// Define routes
router.post("/create_meeting", Middleware, createMeetings);
router.get("/meeting-getall", Middleware, getAllMeetings);
router.delete("/meetings_delete/:id",Middleware,deleteMeetings);
router.put("/update_meeting/:meetingId",middleware,updatemeetings)

module.exports = router;
