// controllers/Announcement/create.js
const Announcement = require("../../../models/Announcement");
const AnnouncementValidator = require("../../../validators/DashboardValidators/AnnouncementValidator");

async function create(req, res) {
  try {
    const { title, startDate, endDate, description } = req.body;
    const userId = req.user.id;

    // Validate the Announcement data using Joi schema
    const { error } = AnnouncementValidator.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({ message: errorMessages });
    }

    // Create a new Announcement
    const newAnnouncement = new Announcement({
      title,
      startDate,
      endDate,
      description,
      userId,
    });

    // Save the Announcement to the database
    await newAnnouncement.save();

    return res.status(201).json({
      hasError: false,
      message: "Announcement created successfully",
      data: newAnnouncement,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = create;
