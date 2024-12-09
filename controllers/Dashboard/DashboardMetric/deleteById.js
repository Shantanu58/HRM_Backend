const DashboardMetric = require("../../../models/DashboardMetric");

async function deleteById(req, res) {
  try {
    const { id } = req.params; // Extract the 'id' from URL parameters
    const userId = req.user.id; // Assuming user info is available in req.user

    // Find the existing dashboard metric by ID
    const existingMetric = await DashboardMetric.findById(id);

    if (!existingMetric) {
      return res.status(404).json({ message: "Dashboard metric not found" });
    }

    // Check if the current user is the owner of the metric (optional validation)
    if (existingMetric.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this metric" });
    }

    // Delete the dashboard metric
    await DashboardMetric.findByIdAndDelete(id);

    return res.status(200).json({
      hasError: false,
      message: "Dashboard metric deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = deleteById;
