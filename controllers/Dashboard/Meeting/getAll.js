const Meeting = require("../../../models/Meeting");

async function getAll(req, res) {
  try {
    // Extract userId from the logged-in user's token
    const userId = req.user.id;

    // Fetch all meetings for the logged-in user (use userId to filter)
    const meetings = await Meeting.find({ userId });

    if (!meetings || meetings.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No meetings found for this user",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Meetings fetched successfully",
      data: meetings,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = getAll;
