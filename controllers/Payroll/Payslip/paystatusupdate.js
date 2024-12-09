// const Payroll = require("../../../models/Payroll");

// async function payslipstatusupdate(req, res) {
//   const { employeeId, status } = req.body;

//   // Validate input
//   if (!employeeId || !status) {
//     console.log("Error: Missing employeeId or status");
//     return res.status(400).json({
//       message: "Employee ID and status are required"
//     });
//   }

//   try {
//     console.log(`Updating status for employeeId: ${employeeId} to status: ${status}`);

//     // Update the status in the database
//     const result = await Payroll.updateOne(
//       { employeeId: employeeId }, // Filter by employeeId
//       { $set: { status: status } } // Update the status field
//     );

//     if (result.modifiedCount === 0) {
//       console.log("Error: Payslip not found or status already updated");
//       return res.status(404).json({
//         message: "Payslip not found or status already updated"
//       });
//     }

//     // Fetch the updated payslip data and populate the employee details
//     const updatedPayslip = await Payroll.findOne({ employeeId: employeeId })
//       .populate('employeeId', 'name email')  // Populate employee data (adjust fields as needed)
//       .exec();

//     if (!updatedPayslip) {
//       console.log("Error: Payslip not found");
//       return res.status(404).json({
//         message: "Payslip not found"
//       });
//     }

//     console.log("Payslip status updated successfully:", updatedPayslip);

//     res.status(200).json({
//       message: "Status updated successfully",
//       data: updatedPayslip 
//     });
//   } catch (error) {
//     console.error("Error updating status:", error);
//     res.status(500).json({
//       message: "Failed to update status",
//       error: error.message
//     });
//   }
// }

// module.exports = payslipstatusupdate;

// const Payroll = require("../../../models/Payroll");

// async function payslipstatusupdate(req, res) {
//   const { status } = req.body;  // Only status comes from the request body
//   const { payslipId } = req.params;  // Get payslipId from URL parameters

//   // Validate input
//   if (!payslipId || !status) {
//     console.log("Error: Missing payslipId or status");
//     return res.status(400).json({
//       message: "Payslip ID and status are required"
//     });
//   }

//   try {
//     console.log(`Attempting to update status for payslipId: ${payslipId} to status: ${status}`);

//     // Find the existing payslip first
//     const existingPayslip = await Payroll.findById(payslipId);
//     if (!existingPayslip) {
//       console.log("Error: Payslip not found");
//       return res.status(404).json({
//         message: "Payslip not found"
//       });
//     }

//     // Check if the status is already the same
//     if (existingPayslip.status === status) {
//       console.log(`Payslip already has the status '${status}', no update necessary.`);
//       return res.status(400).json({
//         message: `Payslip is already marked as '${status}'`
//       });
//     }

//     // Update the status in the database using payslipId
//     const result = await Payroll.updateOne(
//       { _id: payslipId }, // Filter by payslipId (assuming _id is used as payslipId)
//       { $set: { status: status } } // Update the status field
//     );

//     // Check if the update was successful
//     if (result.modifiedCount === 0) {
//       console.log("Error: No document was modified");
//       return res.status(404).json({
//         message: "Payslip not found or status was not updated"
//       });
//     }

//     // Fetch the updated payslip data and populate the employee details
//     const updatedPayslip = await Payroll.findOne({ _id: payslipId })
//       .populate('employeeId', 'name email')  // Populate employee data (adjust fields as needed)
//       .exec();

//     if (!updatedPayslip) {
//       console.log("Error: Payslip not found after update");
//       return res.status(404).json({
//         message: "Payslip not found"
//       });
//     }

//     console.log("Payslip status updated successfully:", updatedPayslip);

//     res.status(200).json({
//       message: "Status updated successfully",
//       data: updatedPayslip 
//     });
//   } catch (error) {
//     console.error("Error updating status:", error);
//     res.status(500).json({
//       message: "Failed to update status",
//       error: error.message
//     });
//   }
// }

// module.exports = payslipstatusupdate;

const Payroll = require("../../../models/Payroll"); // Update the path to your Payroll model

// Update payroll status by _id
const payslipstatusupdate = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the payroll document by its _id
    const payroll = await Payroll.findById(id);

    if (!payroll) {
      return res.status(404).json({ message: 'Payroll record not found.' });
    }

    // Update the status to 'paid'
    payroll.status = 'paid';
    await payroll.save();

    res.status(200).json({
      message: 'Payslip status updated successfully.',
      data: payroll,
    });
  } catch (error) {
    console.error('Error updating payslip status:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = payslipstatusupdate;


