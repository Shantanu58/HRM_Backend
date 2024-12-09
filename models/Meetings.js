const mongoose = require("mongoose");

const meetingsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: [false],
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: [false],
    },
    employeeIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
    date: {
      type: Date,
      required: [false],
    },
    time: {
      type: String,
      required: [true, "Meeting time is required"],
      validate: {
        validator: (value) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value),
        message: "Time must be in HH:MM format",
      },
    },
    note: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Meetings = mongoose.model("Meetings", meetingsSchema);

module.exports = Meetings;
