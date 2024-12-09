const ManageLeave = require("../../../models/ManageLeave");

// Function to update the leave status to "Cancelled"
async function updateStatusCancelled(req, res) {
  try {
    const { id } = req.params;

    // Find the leave record by its ID
    const leave = await ManageLeave.findById(id);

    // If the leave record doesn't exist
    if (!leave) {
      return res.status(404).json({
        message: "Leave record not found.",
      });
    }

    // Check if the leave status is already cancelled
    if (leave.status === "Cancelled") {
      return res.status(400).json({
        message: "Leave status is already cancelled.",
      });
    }

    // Update the leave status to "Cancelled"
    leave.status = "Cancelled";
    await leave.save();

    // Return success response with updated leave
    return res.status(200).json({
      message: "Leave status updated to 'Cancelled'.",
      data: leave,
    });
  } catch (error) {
    console.error("Error cancelling leave status:", error);
    return res.status(500).json({
      message: "Failed to cancel leave status.",
      error: error.message,
    });
  }
}

module.exports = updateStatusCancelled;
