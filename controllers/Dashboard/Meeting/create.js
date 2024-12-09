// controllers/Meeting/create.js
const Meeting = require("../../../models/Meeting");
const MeetingValidator = require("../../../validators/DashboardValidators/MeetingValidator");

async function create(req, res) {
  try {
    const { title, date, time } = req.body;
    const userId = req.user.id;

    // Validate the meeting data using Joi schema
    const { error } = MeetingValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    // Create a new meeting
    const newMeeting = new Meeting({
      title,
      date,
      time,
      userId,
    });

    // Save the meeting to the database
    await newMeeting.save();

    return res.status(201).json({
      hasError: false,
      message: "Meeting created successfully",
      data: newMeeting,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = create;
