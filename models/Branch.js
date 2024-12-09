const mongoose = require("mongoose");

// Branch Schema
const BranchSchema = new mongoose.Schema({
  branchName: {
    type: String,
    required: true,
    unique: true,
  },
});

// Branch Model
const Branch = mongoose.model("Branch", BranchSchema);
module.exports = Branch;
