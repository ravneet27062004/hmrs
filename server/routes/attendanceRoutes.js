const express = require("express");

const {
  markAttendance,
  getAttendance,
} = require("../controllers/attendanceController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// MARK ATTENDANCE
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  markAttendance
);


// GET ATTENDANCE
router.get(
  "/",
  authMiddleware,
  getAttendance
);

module.exports = router;