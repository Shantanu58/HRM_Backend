// models/DashboardMetric.js
const mongoose = require("mongoose");

const DashboardMetricSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    value: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DashboardMetric", DashboardMetricSchema);
