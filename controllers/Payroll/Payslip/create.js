const Payroll = require('../../../models/Payroll');
const Employee = require('../../../models/Employee');
const Payrollvalidators = require('../../../validators/Payrollvalidators/Payrollvalidators.js');

// Create a new payroll record
async function create(req, res) {
  const { error } = Payrollvalidators.validate(req.body);  // Validate the request body

  // If validation fails, return a 400 error with validation details
  if (error) {
    return res.status(400).json({
      error: error.details.map(detail => detail.message).join(', ')
    });
  }

  const { employeeId, payrollType, salary, netSalary, status, paydate } = req.body;

  try {
    // Check if the employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Extract month and year from paydate
    const payMonth = new Date(paydate).getMonth() + 1;  // Get month (1-12)
    const payYear = new Date(paydate).getFullYear();    // Get full year (e.g., 2024)

    // Create the new payroll entry with all required fields
    const newPayroll = new Payroll({
      employeeId,
      payrollType,
      salary,
      netSalary,
      status,        // Status of payroll (e.g., 'paid', 'unpaid')
      paydate,       // Paydate for the payroll record
      month: payMonth, // Month (from paydate)
      year: payYear   // Year (from paydate)
    });

    // Save the payroll record to the database
    await newPayroll.save();

    // Send success response
    res.status(201).json({
      message: 'Payroll record created successfully',
      data: newPayroll
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the payroll record' });
  }
};

module.exports = create;  // Export the function
