const MeetingValidator = require("../../../validators/Meetings/Meetingsvalidators");
const Meeting = require("../../../models/Meetings");

async function updateMeeting(req, res) {
  try {
  
    const { error } = MeetingValidator.validate(req.body);

    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({
        message: errorMessages,
        hasError: true,
      });
    }

    const { title, date, time, note } = req.body;
    const { meetingId } = req.params; 


    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      return res.status(404).json({
        message: "Meeting not found.",
        hasError: true,
      });
    }

    
    meeting.title = title || meeting.title; 
    meeting.date = date || meeting.date;
    meeting.time = time || meeting.time;
    meeting.note = note || meeting.note;

   
    await meeting.save();

    return res.status(200).json({
      message: "Meeting updated successfully!",
      meeting: meeting,
      hasError: false,
    });
  } catch (error) {
    console.error("Error updating meeting:", error);
    return res.status(500).json({
      message: "Failed to update meeting.",
      error: error.message,
      hasError: true,
    });
  }
}

module.exports = updateMeeting;
