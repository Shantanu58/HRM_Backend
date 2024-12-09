const ZoomMeeting = require("../../../models/ZoomMeeting");

async function getAllZoomMeetings(req, res) {
  try {
    const meetings = await ZoomMeeting.find();

    if (meetings.length === 0) {
      return res.status(404).json({
        message: "No Zoom meetings found.",
        hasError: true,
      });
    }

    return res.status(200).json({
      message: "Zoom meetings retrieved successfully.",
      meetings,
      hasError: false,
    });
  } catch (error) {
    console.error("Error retrieving Zoom meetings:", error);
    return res.status(500).json({
      message: "Failed to retrieve Zoom meetings.",
      error: error.message,
      hasError: true,
    });
  }
}

module.exports = getAllZoomMeetings;
