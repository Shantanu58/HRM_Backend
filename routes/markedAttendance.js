const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createMarkedAttendance,
  getAllMarkedAttendance,
} = require("../controllers/Timesheet");

router.post("/marked-attendance", Middleware, createMarkedAttendance);
router.get("/marked-attendance-get-all", Middleware, getAllMarkedAttendance);

module.exports = router;
