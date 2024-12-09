const Meeting = require("../../../models/Meetings");

async function getMeetings(req, res) {
  try {
   
    const { branchId, departmentId, date, employeeIds } = req.query;

  
    const filter = {};

    if (branchId) {
      filter.branchId = branchId;
    }

    if (departmentId) {
      filter.departmentId = departmentId;
    }

    if (date) {
 
      filter.date = new Date(date);
    }

    if (employeeIds) {

      filter.employeeIds = { $in: employeeIds.split(",") };
    }


    const meetings = await Meeting.find(filter).populate('employeeIds').exec();

    if (meetings.length === 0) {
      return res.status(404).json({
        message: "No meetings found for the provided criteria.",
        hasError: true,
      });
    }

    return res.status(200).json({
      message: "Meetings fetched successfully.",
      meetings,
      hasError: false,
    });
  } catch (error) {
    console.error("Error fetching meetings:", error);
    return res.status(500).json({
      message: "Failed to fetch meetings.",
      error: error.message,
      hasError: true,
    });
  }
}

module.exports = getMeetings;
