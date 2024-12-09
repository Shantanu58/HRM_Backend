const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attendance", AttendanceSchema);
