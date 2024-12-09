// HRMGO-Backend\controllers\Employee\Employee\getAll.js

const Employee = require("../../../models/Employee");

async function getAll(req, res) {
  try {
    const employees = await Employee.find()
      .populate("branchId", "branchName")
      .populate("departmentId", "departmentName");

    // Map the employees to the desired format
    const employeeData = employees.map((employee) => {
      return {
        _id: employee._id,
        id: employee.id,
        name: employee.name,
        email: employee.email,
        branchName: employee.branchId?.branchName, // Extract branchName from populated branchId
        departmentName: employee.departmentId?.departmentName, // Extract departmentName from populated departmentId
        designation: employee.designation,
        joiningDate: employee.joiningDate,
        __v: employee.__v,
      };
    });

    return res.status(200).json({
      message: "Employees retrieved successfully!",
      data: employeeData,
      hasError: false,
    });
  } catch (error) {
    console.error("Error retrieving employees:", error);
    return res.status(500).json({
      message: "Failed to retrieve employees.",
      error: error.message,
    });
  }
}

module.exports = getAll;
