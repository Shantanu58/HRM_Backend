const Payroll = require("../../../models/Payroll");

async function getPayrollWithEmployeeDetails(req, res) {
  try {
    const payrolls = await Payroll.find({})
      .populate({
        path: 'employeeId',
        select: 'id name -_id', // Include `id` (custom) and `name`, exclude `_id`
      })
      .select('employeeId payrollType salary netSalary'); // Include other Payroll fields

    return res.status(200).json({
      message: "Payroll data retrieved successfully!",
      data: payrolls,
      hasError: false,
    });
  } catch (error) {
    console.error("Error retrieving payroll data:", error);
    return res.status(500).json({
      message: "Failed to retrieve payroll data.",
      error: error.message,
    });
  }
}

module.exports = getPayrollWithEmployeeDetails;
