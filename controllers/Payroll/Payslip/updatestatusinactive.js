// const Payroll = require('../../../models/Payroll');

// // Delete a payroll record by its ObjectId (_id)
// async function deletePayroll(req, res) {
//   const { id } = req.params; 

//   try {
//     // Check if the payroll record exists
//     const payroll = await Payroll.findById(id);
//     if (!payroll) {
//       return res.status(404).json({ error: 'Payroll record not found' });
//     }

//     // Delete the payroll record
//     await Payroll.findByIdAndDelete(id);

//     // Send success response
//     res.status(200).json({
//       message: 'Payroll record deleted successfully',
//       data: payroll,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while deleting the payroll record' });
//   }
// };

// module.exports = deletePayroll;


const Payroll = require('../../../models/Payroll');

// Function to update the leave status to "Cancelled"
async function updatestatusinactive(req, res) {
  try {
    const { id } = req.params;

    // Find the leave record by its ID
    const leave = await Payroll.findById(id);

    // If the leave record doesn't exist
    if (!leave) {
      return res.status(404).json({
        message: "Leave record not found.",
      });
    }

    // Check if the leave status is already cancelled
    if (leave.status === "inactive") {
      return res.status(400).json({
        message: "Leave status is already cancelled.",
      });
    }

    // Update the leave status to "Cancelled"
    leave.status = "inactive";
    await leave.save();

    // Return success response with updated leave
    return res.status(200).json({
      message: "Leave status updated to 'inactive'.",
      data: leave,
    });
  } catch (error) {
    console.error("Error inactive leave status:", error);
    return res.status(500).json({
      message: "Failed to inactive leave status.",
      error: error.message,
    });
  }
}

module.exports = updatestatusinactive;



