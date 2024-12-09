const mongoose = require("mongoose");

// Define the schema for managing leaves with a reference to Employee
const ManageLeaveSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  leaveType: { type: String, required: true },
  appliedOn: { type: Date, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalDays: { type: Number, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["Approved", "Reject", "Pending", "Cancelled"],
    default: "Pending",
  },
});

ManageLeaveSchema.index(
  { employeeId: 1, startDate: 1, endDate: 1 },
  { unique: true }
);

const ManageLeave = mongoose.model("ManageLeave", ManageLeaveSchema);
module.exports = ManageLeave;
