const Leave = require("../models/Leave");


// APPLY LEAVE
const applyLeave = async (req, res) => {

  try {

    const {
      employeeId,
      reason,
      fromDate,
      toDate,
    } = req.body;

    const leave = await Leave.create({
      employeeId,
      reason,
      fromDate,
      toDate,
      status: "Pending",
    });

    res.status(201).json(leave);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// GET ALL LEAVES
const getLeaves = async (req, res) => {

  try {

    const leaves = await Leave.find()
      .populate("employeeId", "name email");

    res.status(200).json(leaves);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// APPROVE / REJECT LEAVE
const updateLeaveStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const leave = await Leave.findById(req.params.id);

    if (!leave) {

      return res.status(404).json({
        message: "Leave not found",
      });
    }

    leave.status = status;

    await leave.save();

    res.status(200).json({
      message: "Leave updated successfully",
      leave,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


module.exports = {
  applyLeave,
  getLeaves,
  updateLeaveStatus,
};