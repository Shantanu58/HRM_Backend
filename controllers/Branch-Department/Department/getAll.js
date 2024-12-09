const Department = require("../../../models/Department");

async function getAll(req, res) {
  try {
    // Fetch all departments
    const departments = await Department.find();

    if (departments.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Department found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Departments fetched successfully",
      data: departments,
    });
  } catch (error) {
    console.error("Error fetching departments:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
