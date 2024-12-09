const Meeting = require("../../../models/Meetings");

async function deleteMeeting(req, res) {
  const { id } = req.params;

  try {
    const deletedMeeting = await Meeting.findByIdAndDelete(id);

    if (!deletedMeeting) {
      return res.status(404).json({
        message: 'Meeting not found',
      });
    }

    res.status(200).json({
      message: 'Meeting deleted successfully',
      data: deletedMeeting,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the meeting',
      error: error.message,
    });
  }
}

module.exports = deleteMeeting;
