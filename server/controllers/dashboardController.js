const Employee = require("../models/Employee");
const Leave = require("../models/Leave");
const Attendance = require("../models/Attendance");

const getDashboardStats = async (req, res) => {
  try {

    const employeeCount = await Employee.countDocuments();

    const leaveCount = await Leave.countDocuments();

    const attendanceCount =
      await Attendance.countDocuments();

    res.status(200).json({
      totalEmployees: employeeCount,
      totalLeaves: leaveCount,
      totalAttendanceRecords: attendanceCount,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};