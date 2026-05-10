const Employee = require("../models/Employee");


// ADD EMPLOYEE
const addEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL EMPLOYEES
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE EMPLOYEE
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE EMPLOYEE
const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Employee Deleted Successfully",
    });
  } catch (error) {

  if (error.code === 11000) {
    return res.status(400).json({
      message: "Employee email already exists",
    });
  }

  res.status(500).json({
    message: error.message,
  });
}
};


module.exports = {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};