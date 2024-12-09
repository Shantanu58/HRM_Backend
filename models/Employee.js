const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    // i want this id
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
