// controllers/DashboardMetric/get.js
const DashboardMetric = require("../../../models/DashboardMetric");

async function getAll(req, res) {
  try {
    // Retrieve all dashboard metrics from the database
    const metrics = await DashboardMetric.find();
    // If no metrics are found
    if (metrics.length === 0) {
      return res.status(404).json({ message: "No dashboard metrics found" });
    }
    // Return the list of metrics
    return res.status(200).json({
      hasError: false,
      message: "Dashboard metrics retrieved successfully",
      data: metrics,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = getAll;
