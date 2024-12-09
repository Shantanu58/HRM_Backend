const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createAttendance,
  getAllAttendance,
} = require("../controllers/Dashboard");

// Define routes
router.post("/attendance", Middleware, createAttendance);
router.get("/attendance-get-all", Middleware, getAllAttendance);

module.exports = router;
