const Employee = require("../../../models/Employee");

async function getEmployeeNameById(req, res) {
  try {
    const { id } = req.params;  // Employee ID will come from the URL parameter

    // Fetch the employee by ID, selecting only the 'name' field
    const employee = await Employee.findOne({ id }).select('name'); // Only return 'name' field

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    // Return the employee's name
    return res.status(200).json({
      name: employee.name,
      hasError: false,
    });
  } catch (error) {
    console.error("Error fetching employee by ID:", error);
    return res.status(500).json({
      message: "Failed to fetch employee.",
      error: error.message,
    });
  }
}

module.exports = getEmployeeNameById;
