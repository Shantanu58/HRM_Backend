const TimeSheetValidator = require("../../../validators/TimeSheet/TimeSheetValidator");
const TimeSheet = require("../../../models/TimeSheet");

async function create(req, res) {
  try {
    // Validate the incoming request body using Joi schema
    const { error } = TimeSheetValidator.validate(req.body);
    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    const { employeeId, date, remark, hours } = req.body;

    // Normalize date to midnight in UTC for daily uniqueness check
    const normalizedDate = new Date(date);
    normalizedDate.setUTCHours(0, 0, 0, 0);

    // Check if there is an existing entry for the same employee and date
    const existingTimeSheet = await TimeSheet.findOne({
      employeeId,
      date: normalizedDate, // Using normalized date for the query
    });

    if (existingTimeSheet) {
      return res.status(400).json({
        message: "An entry for this employee already exists on the given date.",
      });
    }

    // Create new time sheet entry if no existing entry is found
    const newTimeSheet = new TimeSheet({
      employeeId,
      date: normalizedDate,
      remark,
      hours,
    });

    await newTimeSheet.save();

    return res.status(201).json({
      message: "TimeSheet created successfully!",
      timeSheet: newTimeSheet,
      hasError: false,
    });
  } catch (error) {
    console.error("Error creating timeSheet:", error);
    return res.status(500).json({
      message: "Failed to create timeSheet.",
      error: error.message,
    });
  }
}

module.exports = create;
