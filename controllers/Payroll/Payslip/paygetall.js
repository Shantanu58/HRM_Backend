const Payroll = require("../../../models/Payroll");

async function getPayrollWithEmployeeDetails(req, res) {
  try {
    const { month, year } = req.query; // Assuming you're passing month and year in the query parameters

    const filter = {};
    if (month) filter.month = month;
    if (year) filter.year = year;

    // Add a filter to only show payroll records with 'paid' or 'unpaid' status
    filter.status = { $in: ['paid', 'unpaid'] }; // Filter for 'paid' or 'unpaid' status

    // Fetch payroll records, populate employee details, and select required fields
    const payrolls = await Payroll.find(filter)
      .populate({
        path: 'employeeId',
        select: 'id name', // Get employee id and name
      })
      .select('employeeId payrollType salary netSalary status paydate'); // Include necessary fields in payroll

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


