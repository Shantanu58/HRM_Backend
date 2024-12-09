// routes/dashboard.js

const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

// Controller imports
const {
  createTimeSheet,
  getAllTimeSheet,
} = require("../controllers/Timesheet");

// Define routes
router.post("/timesheet", Middleware, createTimeSheet);
router.get("/timesheet-get-all", Middleware, getAllTimeSheet);

module.exports = router;
