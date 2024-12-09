const Attendance = require("../../../models/Attendance");

async function getAll(req, res) {
  try {
    // Extract userId from the logged-in user's token
    const userId = req.user.id;

    // Fetch all meetings for the logged-in user (use userId to filter)
    const attendance = await Attendance.find({ userId });

    if (!attendance || attendance.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No attendance found for this user",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Attendance fetched successfully",
      data: attendance,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = getAll;
