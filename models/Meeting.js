const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

const Meeting = mongoose.model("Meeting", MeetingSchema);

module.exports = Meeting;
