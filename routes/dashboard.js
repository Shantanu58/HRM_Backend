const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createDashboardMetric,
  getAllDashboardMetric,
  getDashboardMetricById,
  deleteDashboardMetricById,
  updateDashboardMetricById,
} = require("../controllers/Dashboard");

// Define routes
router.post("/dashboard-metric", Middleware, createDashboardMetric);
router.get("/dashboard-metric-get-all", Middleware, getAllDashboardMetric);
router.get("/dashboard-metric/:id", Middleware, getDashboardMetricById);
router.put("/dashboard-metric/:id", Middleware, updateDashboardMetricById);
router.delete("/dashboard-metric/:id", Middleware, deleteDashboardMetricById);

module.exports = router;
