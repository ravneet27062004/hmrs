const Leave = require("../models/Leave");


// APPLY LEAVE
const applyLeave = async (req, res) => {
  try {
    const leave = await Leave.create(req.body);

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET LEAVES
const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employeeId");

    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE LEAVE STATUS
const updateLeaveStatus = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  applyLeave,
  getLeaves,
  updateLeaveStatus,
};