const User = require("../models/User");
const bcrypt = require("bcrypt");

/* CREATE EMPLOYEE */
exports.createEmployee = async (req, res) => {
  const { name, email, password, hourlyRate } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Employee already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const employee = await User.create({
    name,
    email,
    password: hashedPassword,
    hourlyRate,
    role: "employee",
  });

  res.json({ message: "Employee created", employee });
};

exports.getEmployees = async (req, res) => {
  const employees = await User.find({
    role: "employee",
    isActive: true
  }).select("-password");

  res.json(employees);
};


exports.getEmployeeById = async (req, res) => {
  const employee = await User.findById(req.params.id).select("-password");
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json(employee);
};

/* UPDATE EMPLOYEE */
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, hourlyRate } = req.body;

    const employee = await User.findById(id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.hourlyRate = hourlyRate || employee.hourlyRate;

    await employee.save();
    res.json({ message: "Employee updated", employee });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

/* SOFT DELETE EMPLOYEE */
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await User.findById(id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    employee.isActive = false;
    await employee.save();

    res.json({ message: "Employee disabled (soft deleted)" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

/* RE-ENABLE EMPLOYEE */
exports.enableEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await User.findById(id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    employee.isActive = true;
    await employee.save();

    res.json({ message: "Employee re-enabled" });
  } catch (err) {
    res.status(500).json({ message: "Enable failed" });
  }
};

/* GET DISABLED EMPLOYEES */
exports.getDisabledEmployees = async (req, res) => {
  const employees = await User.find({
    role: "employee",
    isActive: false
  }).select("-password");

  res.json(employees);
};

/* RESET EMPLOYEE PASSWORD */
exports.resetEmployeePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: "Password required" });
    }

    const employee = await User.findById(id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    employee.password = hashedPassword;
    await employee.save();

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: "Password reset failed" });
  }
};


