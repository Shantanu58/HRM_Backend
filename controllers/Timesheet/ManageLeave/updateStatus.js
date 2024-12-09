const ManageLeave = require("../../../models/ManageLeave");

async function updateStatus(req, res) {
  try {
    // Extract leave ID and new status from request
    const { id } = req.params; // Assuming the leave ID is in the URL
    const { status } = req.body; // Assuming the new status is in the request body

    // Validate the new status
    const validStatuses = ["Approved", "Reject", "Pending"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Status must be one of: Approved, Reject, Pending.",
        hasError: true,
      });
    }

    // Find the leave application by ID and update its status
    const updatedLeave = await ManageLeave.findByIdAndUpdate(
      id, // Find the leave by ID
      { status }, // Update only the status field
      { new: true } // Return the updated document
    );

    if (!updatedLeave) {
      return res.status(404).json({
        message: "Leave application not found.",
        hasError: true,
      });
    }

    return res.status(200).json({
      message: "Status updated successfully.",
      leave: updatedLeave,
      hasError: false,
    });
  } catch (error) {
    console.error("Error updating leave status:", error);
    return res.status(500).json({
      message: "Failed to update leave status.",
      error: error.message,
    });
  }
}

module.exports = updateStatus;
