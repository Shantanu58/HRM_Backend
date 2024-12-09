// routes/dashboard.js

const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

// Controller imports
const {
  createManageLeave,
  getAllManageLeave,
  updateStatus,
  updateStatusCancelled,
  updateByLeaveId,
  getAllByQuery,
} = require("../controllers/Timesheet");

// Define routes
router.post("/manage-leave", Middleware, createManageLeave);
router.get("/manage-leave-get-all", Middleware, getAllManageLeave);
router.put("/manage-leave-update-status/:id", Middleware, updateStatus);
router.put("/manage-leave-delete/:id", Middleware, updateStatusCancelled);
router.put("/manage-leave-update/:id", Middleware, updateByLeaveId);
router.get("/manage-leave-get-all-by-query", Middleware, getAllByQuery);

module.exports = router;
