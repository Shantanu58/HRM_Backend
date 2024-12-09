const Employee = require("../../../models/Employee");

async function getAllName(req, res) {
  try {
    // Use the `select` method to include only the `name` field and `_id`
    const employees = await Employee.find({}, "name");

    // Return the list of names
    return res.status(200).json({
      message: "Employee names retrieved successfully!",
      data: employees,
      hasError: false,
    });
  } catch (error) {
    console.error("Error retrieving employee names:", error);
    return res.status(500).json({
      message: "Failed to retrieve employee names.",
      error: error.message,
    });
  }
}

module.exports = getAllName;
