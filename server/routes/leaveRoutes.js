const express = require("express");

const {
  applyLeave,
  getLeaves,
  updateLeaveStatus,
} = require("../controllers/leaveController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// APPLY LEAVE
router.post(
  "/",
  authMiddleware,
  applyLeave
);


// GET LEAVES
router.get(
  "/",
  authMiddleware,
  getLeaves
);


// APPROVE / REJECT
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateLeaveStatus
);

module.exports = router;