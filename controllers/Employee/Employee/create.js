const EmployeeValidator = require("../../../validators/EmployeeValidators/EmployeeValidator");
const Employee = require("../../../models/Employee");

async function create(req, res) {
  try {
    const { error } = EmployeeValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const { name, email, branchId, departmentId, designation, joiningDate } =
      req.body;

    // Manually generate the employee ID before saving
    const lastEmployee = await Employee.findOne().sort({ id: -1 }).limit(1);
    const lastEmployeeId = lastEmployee ? lastEmployee.id : "EMP0000000";
    const nextEmployeeIdNumber =
      parseInt(lastEmployeeId.replace("EMP", "")) + 1;
    const nextEmployeeId = `EMP${nextEmployeeIdNumber
      .toString()
      .padStart(7, "0")}`;

    // Create a new employee instance
    const newEmployee = new Employee({
      id: nextEmployeeId,
      name,
      email,
      branchId,
      departmentId,
      designation,
      joiningDate,
    });

    // Save the employee to the database
    await newEmployee.save();

    return res.status(201).json({
      message: "Employee created successfully!",
      employee: newEmployee,
      hasError: false,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    return res.status(500).json({
      message: "Failed to create employee.",
      error: error.message,
    });
  }
}

module.exports = create;
