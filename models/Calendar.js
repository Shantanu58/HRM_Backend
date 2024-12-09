const mongoose = require("mongoose");

const CalendarSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: {
      type: String,
      required: true,
    },

    color: { type: String, required: true },
  },
  { timestamps: true }
);

const Calendar = mongoose.model("Calendar", CalendarSchema);

module.exports = Calendar;
