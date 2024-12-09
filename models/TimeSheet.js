const mongoose = require("mongoose");

const TimeSheetSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: { type: Date, required: true },
  remark: {
    type: String,
    required: true,
    maxlength: 500, // Optionally, limit the remark length
  },
  hours: {
    type: Number,
    required: true,
    min: 0, // Ensures that hours can't be negative
  },
});

// Create a unique index on employeeId and date
TimeSheetSchema.index({ employeeId: 1, date: 1 }, { unique: true });

const TimeSheet = mongoose.model("TimeSheet", TimeSheetSchema);
module.exports = TimeSheet;
