const Employee = require("../../../models/Employee");

async function getByBranchDepartment(req, res) {
  const { branchId, departmentId } = req.query;

  try {
    // Validate if both branchId and departmentId are provided
    if (!branchId || !departmentId) {
      return res.status(400).json({
        hasError: true,
        message: "Both branchId and departmentId are required",
      });
    }

    // Fetch employees based on branchId and departmentId
    const employees = await Employee.find({ branchId, departmentId });

    if (employees.length === 0) {
      return res.status(404).json({
        hasError: false,
        message: "No employees found for the given branch and department",
      });
    }

    return res.status(200).json({
      hasError: false,
      data: employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch employees",
      error: error.message,
    });
  }
}

module.exports = getByBranchDepartment;
