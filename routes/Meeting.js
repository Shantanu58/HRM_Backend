const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const { createMeeting, getAllMeeting } = require("../controllers/Dashboard");

// Define routes
router.post("/meeting", Middleware, createMeeting);
router.get("/meeting-get-all", Middleware, getAllMeeting);

module.exports = router;
