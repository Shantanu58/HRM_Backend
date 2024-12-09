const ZoomMeetingValidator = require("../../../validators/ZoomMeetingValidators/ZoomMeetingValidators");
const ZoomMeeting = require("../../../models/ZoomMeeting");

async function createZoomMeeting(req, res) {
  try {
    const { error } = ZoomMeetingValidator.validate(req.body);

    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({
        message: errorMessages,
        hasError: true,
      });
    }

    const { title, employeeNames, start_date, duration, password, join_url, status } = req.body;

    const newZoomMeeting = new ZoomMeeting({
      title,
      employeeNames,  // Changed from employeeIds to employeeNames
      start_date,
      duration,
      password: password || "",
      join_url: join_url || "",
      status: status || "Waiting",
    });

    await newZoomMeeting.save();

    return res.status(201).json({
      message: "Zoom Meeting created successfully!",
      meeting: newZoomMeeting,
      hasError: false,
    });
  } catch (error) {
    console.error("Error creating Zoom meeting:", error);
    return res.status(500).json({
      message: "Failed to create Zoom meeting.",
      error: error.message,
      hasError: true,
    });
  }
}

module.exports = createZoomMeeting;
