const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
      user: req.user,
    });
  }
);

router.get(
  "/employee",
  authMiddleware,
  roleMiddleware("employee", "admin"),
  (req, res) => {
    res.json({
      message: "Welcome Employee",
      user: req.user,
    });
  }
);

module.exports = router;