const Employee = require("../../../models/Employee");
const moment = require("moment");
const MarkedAttendance = require("../../../models/MarkedAttendance");

async function getFilteredEmployees(req, res) {
  const { branchId, departmentId, date } = req.query;
  const query = {};

  // Filter employees by branchId and departmentId if provided
  if (branchId) {
    query.branchId = branchId;
  }

  if (departmentId) {
    query.departmentId = departmentId;
  }

  try {
    // Fetch employees based on branchId and departmentId
    const employees = await Employee.find(query)
      .populate("branchId", "branchName")
      .populate("departmentId", "departmentName")
      .lean();
    console.log("Fetched Employees:", employees);

    // Initialize an empty array for attendance records
    let attendanceRecords = [];

    if (date) {
      // Normalize the date to filter the attendance records
      const attendanceDate = moment(date).startOf("day").toISOString();
      const endOfDay = moment(date).endOf("day").toISOString();

      console.log("Attendance Date Range:", attendanceDate, endOfDay);

      // Fetch attendance records for the specified date and the filtered employees
      attendanceRecords = await MarkedAttendance.find({
        date: { $gte: attendanceDate, $lte: endOfDay },
        employeeId: { $in: employees.map((employee) => employee._id) },
      });
      //.populate("employeeId"); // Populate employeeId if necessary
    }

    // Map employee data and their attendance records
    const employeeData = employees.map((employee) => {
      // Find the attendance record for the employee for the specified date
      const attendance = attendanceRecords.find(
        (record) => record.employeeId.toString() === employee._id.toString()
      );

      // Return employee data with attendance details if found, or null for attendance
      return {
        _id: employee._id,
        id: employee.id,
        name: employee.name,
        email: employee.email,
        branchName: employee.branchId?.branchName,
        departmentName: employee.departmentId?.departmentName,
        designation: employee.designation,
        joiningDate: employee.joiningDate,
        attendance: attendance
          ? {
              date: attendance.date,
              status: attendance.status,
              clockIn: attendance.clockIn,
              clockOut: attendance.clockOut,
              late: attendance.late,
              earlyLeaving: attendance.earlyLeaving,
              overtime: attendance.overtime,
            }
          : null, // No attendance data for the specified date
        __v: employee.__v,
      };
    });

    return res.status(200).json({
      message: "Filtered employees retrieved successfully!",
      data: employeeData,
      hasError: false,
    });
  } catch (error) {
    console.error("Error retrieving filtered employees:", error);
    return res.status(500).json({
      message: "Failed to retrieve filtered employees.",
      error: error.message,
    });
  }
}

module.exports = getFilteredEmployees;
