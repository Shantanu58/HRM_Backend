const DashboardMetric = require("../../../models/DashboardMetric");
const DashboardMetricValidator = require("../../../validators/DashboardValidators/DashboardMetricValidator");

async function updateById(req, res) {
  try {
    const { id } = req.params; // Extract the 'id' from URL parameters
    const { title, subtitle, value } = req.body; // Extract the data from the request body
    const userId = req.user.id; // Assuming user info is available in req.user

    // Validate the incoming data using the validator
    const { error } = DashboardMetricValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details[0].message;
      return res.status(400).json({ message: errorMessages });
    }

    // Find the existing dashboard metric by ID
    const existingMetric = await DashboardMetric.findById(id);

    if (!existingMetric) {
      return res.status(404).json({ message: "Dashboard metric not found" });
    }

    // Check if the current user is the owner of the metric (optional validation)
    if (existingMetric.userId.toString() !== userId) {
      return res.status(403).json({
        hasError: true,
        message: "You are not authorized to update this metric",
      });
    }

    // Update the fields of the dashboard metric
    existingMetric.title = title || existingMetric.title;
    existingMetric.subtitle = subtitle || existingMetric.subtitle;
    existingMetric.value = value || existingMetric.value;

    // Save the updated metric to the database
    await existingMetric.save();

    return res.status(200).json({
      hasError: false,
      message: "Dashboard metric updated successfully",
      data: existingMetric,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = updateById;
