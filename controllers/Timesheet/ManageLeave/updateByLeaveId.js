const ManageLeaveValidator = require("../../../validators/Timesheet/ManageLeaveValidator");
const ManageLeave = require("../../../models/ManageLeave");

async function updateByLeaveId(req, res) {
  try {
    const { id } = req.params;

    // Validate the incoming data
    const { error } = ManageLeaveValidator.validateUpdate(req.body);
    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    // Fetch the existing leave entry
    const existingLeave = await ManageLeave.findById(id);
    if (!existingLeave) {
      return res.status(404).json({
        message: "ManageLeave entry not found.",
        hasError: true,
      });
    }

    // Extract fields from request body, or use existing values
    const leaveType = req.body.leaveType || existingLeave.leaveType;
    const startDate = req.body.startDate || existingLeave.startDate;
    const endDate = req.body.endDate || existingLeave.endDate;
    const reason = req.body.reason || existingLeave.reason;

    // Calculate totalDays automatically (if both startDate and endDate are provided)
    const totalDays = calculateTotalDays(startDate, endDate);

    // Check for conflicts with other leave entries
    const conflictingLeave = await ManageLeave.findOne({
      _id: { $ne: id },
      employeeId: existingLeave.employeeId,
      startDate,
      endDate,
    });

    if (conflictingLeave) {
      return res.status(400).json({
        message: "A leave already exists for the specified dates.",
        hasError: true,
      });
    }

    // Update fields in the existing leave entry
    existingLeave.leaveType = leaveType;
    existingLeave.startDate = startDate;
    existingLeave.endDate = endDate;
    existingLeave.totalDays = totalDays;
    existingLeave.reason = reason;

    // Save the updated leave entry
    await existingLeave.save();

    return res.status(200).json({
      message: "ManageLeave updated successfully!",
      leave: existingLeave,
      hasError: false,
    });
  } catch (error) {
    console.error("Error updating ManageLeave:", error);
    return res.status(500).json({
      message: "Failed to update ManageLeave.",
      error: error.message,
    });
  }
}

// Function to calculate total days between startDate and endDate
function calculateTotalDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = end - start;
  const days = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days
  return days + 1; // Include both start and end date in the total
}

module.exports = updateByLeaveId;
