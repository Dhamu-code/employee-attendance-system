const Attendance = require("../models/Attendance");
const User = require("../models/User");

/* EMPLOYEE: MY PAYROLL */
exports.getMyPayroll = async (req, res) => {
  const { month } = req.query; // YYYY-MM

  const records = await Attendance.find({
    employee: req.user._id,
    date: { $regex: `^${month}` },
  });

  const totalHours = records.reduce(
    (sum, r) => sum + (r.totalHours || 0),
    0
  );

  const user = await User.findById(req.user._id);

  const salary = totalHours * user.hourlyRate;

  res.json({
    month,
    totalHours: totalHours.toFixed(2),
    hourlyRate: user.hourlyRate,
    salary: salary.toFixed(2),
  });
};

/* ADMIN: ALL PAYROLLS */
exports.getAllPayrolls = async (req, res) => {
  const { month } = req.query;

  const employees = await User.find({ role: "employee" });

  const payrolls = [];

  for (let emp of employees) {
    const records = await Attendance.find({
      employee: emp._id,
      date: { $regex: `^${month}` },
    });

    const totalHours = records.reduce(
      (sum, r) => sum + (r.totalHours || 0),
      0
    );

    payrolls.push({
      employee: emp.name,
      email: emp.email,
      totalHours: totalHours.toFixed(2),
      salary: (totalHours * emp.hourlyRate).toFixed(2),
    });
  }

  res.json(payrolls);
};
