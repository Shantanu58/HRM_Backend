const DepartmentValidator = require("../../../validators/BranchDepartmentValidators/DepartmentValidator");
const Department = require("../../../models/Department");

// Create department logic
async function create(req, res) {
  try {
    // Validate the Announcement data using Joi schema
    const { error } = DepartmentValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const { departmentName, branchId } = req.body;

    // Create and save the new department
    const newDepartment = new Department({
      departmentName,
      branchId,
    });

    await newDepartment.save();

    return res.status(201).json({
      message: "Department created successfully!",
      department: newDepartment,
    });
  } catch (error) {
    console.error("Error creating department:", error);

    // Handle unique constraint violation
    if (error.code === 11000) {
      return res.status(400).json({
        message:
          "A department with the same name already exists in this branch.",
        hasError: true,
      });
    }

    return res.status(500).json({
      message: "Failed to create department.",
      error: error.message,
    });
  }
}

module.exports = create;
