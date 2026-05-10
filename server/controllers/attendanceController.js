const Attendance = require("../models/Attendance");


// MARK ATTENDANCE
const markAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ATTENDANCE
const getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("employeeId");

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  markAttendance,
  getAttendance,
};