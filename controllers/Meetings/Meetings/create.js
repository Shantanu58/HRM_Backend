const MeetingValidator = require("../../../validators/Meetings/Meetingsvalidators");
const Meeting = require("../../../models/Meetings");

async function createMeetings(req, res) {
  try {
    const { error } = MeetingValidator.validate(req.body);

    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({
        message: errorMessages,
        hasError: true,
      });
    }

    const { title, branchId, departmentId, employeeIds, date, time, note } = req.body;

    const newMeeting = new Meeting({
      title,
      branchId,
      departmentId,
      employeeIds,
      date,
      time,
      note: note || "",
    });

    await newMeeting.save();

    return res.status(201).json({
      message: "Meeting created successfully!",
      meeting: newMeeting,
      hasError: false,
    });
  } catch (error) {
    console.error("Error creating meeting:", error);
    return res.status(500).json({
      message: "Failed to create meeting.",
      error: error.message,
      hasError: true,
    });
  }
}

module.exports = createMeetings;
