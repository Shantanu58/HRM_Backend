const Calendar = require("../../../models/Calendar");

async function getAll(req, res) {
  try {
    // Extract userId from the logged-in user's token
    const userId = req.user.id;

    // Fetch all Calendars for the logged-in user (use userId to filter)
    const calendars = await Calendar.find({ userId });

    if (!calendars || calendars.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Calendar found for this user",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Calendars fetched successfully",
      data: calendars,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = getAll;
