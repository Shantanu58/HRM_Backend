const mongoose = require("mongoose");
const MarkedAttendance = require("../../../../models/MarkedAttendance");
const moment = require("moment");

async function getAll(req, res) {
  try {
    const { branch, department, date, type } = req.query;
    const filter = {};

    if (branch) filter["branchId"] = new mongoose.Types.ObjectId(branch);
    if (department)
      filter["departmentId"] = new mongoose.Types.ObjectId(department);

    let dateFilter = {};

    if (date) {
      if (type === "daily") {
        const startOfDay = moment(date).startOf("day").toISOString();
        const endOfDay = moment(date).endOf("day").toISOString();
        dateFilter.date = { $gte: startOfDay, $lte: endOfDay };
      } else if (type === "monthly") {
        const startOfMonth = moment(date).startOf("month").toISOString();
        const endOfMonth = moment(date).endOf("month").toISOString();
        dateFilter.date = { $gte: startOfMonth, $lte: endOfMonth };
      }
    }

    const markedAttendance = await MarkedAttendance.find(dateFilter)
      .populate({
        path: "employeeId",
        select: "name branchId departmentId",
        match: { ...filter },
        populate: [{ path: "branchId" }, { path: "departmentId" }],
      })
      .lean()
      .exec();

    const markedAttendanceData = markedAttendance
      .filter((attendance) => attendance.employeeId != null)
      .map((attendance) => {
        const employeeName = attendance.employeeId.name;
        const branchName = attendance.employeeId.branchId.branchName;
        const departmentName =
          attendance.employeeId.departmentId.departmentName;

        const formattedDate = moment.utc(attendance.date).format("MMM D, YYYY");
        const formattedClockIn = moment
          .utc(attendance.clockIn)
          .format("h:mm A");
        const formattedClockOut = moment
          .utc(attendance.clockOut)
          .format("h:mm A");
        //  do for late early leaving and overtime

        const formattedLate = attendance.late || "00:00:00";
        const formattedEarlyLeaving = attendance.earlyLeaving || "00:00:00";
        const formattedOvertime = attendance.overtime || "00:00:00";

        return {
          employeeName,
          branchName,
          departmentName,
          date: formattedDate,
          status: attendance.status,
          clockIn: formattedClockIn,
          clockOut: formattedClockOut,
          late: formattedLate,
          earlyLeaving: formattedEarlyLeaving,
          overtime: formattedOvertime,
        };
      });

    return res.status(200).json({
      message: "Marked Attendance retrieved successfully!",
      data: markedAttendanceData,
    });
  } catch (error) {
    console.error("Error retrieving marked attendance:", error);
    return res.status(500).json({
      message: "Failed to retrieve marked attendance.",
      error: error.message,
    });
  }
}

module.exports = getAll;
