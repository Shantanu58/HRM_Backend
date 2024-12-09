const mongoose = require("mongoose");

const zoomMeetingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  employeeNames: [
    {
      type: String,
      required: true,
    },
  ],
  start_date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
  },
  join_url: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Starting", "Waiting", "End"],
    default: "waiting",
  },
});

const ZoomMeeting = mongoose.model("ZoomMeeting", zoomMeetingSchema);

module.exports = ZoomMeeting;
