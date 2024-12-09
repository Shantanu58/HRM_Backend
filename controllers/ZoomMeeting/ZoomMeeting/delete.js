const ZoomMeeting = require('../../../models/ZoomMeeting');

async function deleteZoomMeeting(req, res) {
  const { id } = req.params;

  try {
    const deletedZoomMeeting = await ZoomMeeting.findByIdAndDelete(id);

    if (!deletedZoomMeeting) {
      return res.status(404).json({
        message: 'Zoom meeting not found',
      });
    }

    res.status(200).json({
      message: 'Zoom meeting deleted successfully',
      data: deletedZoomMeeting,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the Zoom meeting',
      error: error.message,
    });
  }
}

module.exports = deleteZoomMeeting;
