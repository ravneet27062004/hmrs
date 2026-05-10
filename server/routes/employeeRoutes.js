const express = require("express");

const {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// ADD EMPLOYEE
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  addEmployee
);


// GET EMPLOYEES
router.get(
  "/",
  authMiddleware,
  getEmployees
);


// UPDATE EMPLOYEE
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateEmployee
);


// DELETE EMPLOYEE
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteEmployee
);


module.exports = router;