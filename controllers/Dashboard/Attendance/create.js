// controllers/Attendance/create.js
const Attendance = require("../../../models/Attendance");
const AttendanceValidator = require("../../../validators/DashboardValidators/AttendanceValidator");

async function create(req, res) {
  try {
    const { name, status } = req.body;
    const userId = req.user.id;

    // Validate the Attendance data using Joi schema
    const { error } = AttendanceValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    // Create a new Attendance
    const newAttendance = new Attendance({
      name,
      status,
      userId,
    });

    // Save the Attendance to the database
    await newAttendance.save();

    return res.status(201).json({
      hasError: false,
      message: "Attendance created successfully",
      data: newAttendance,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = create;
