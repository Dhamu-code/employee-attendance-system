const Attendance = require("../models/Attendance");

/* CHECK IN */
exports.checkIn = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // prevent multiple check-ins same day
    const today = new Date().toISOString().split("T")[0];

    const already = await Attendance.findOne({
      employeeId: req.user._id,
      createdAt: {
        $gte: new Date(today),
        $lt: new Date(today + "T23:59:59"),
      },
    });

    if (already) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    const attendance = await Attendance.create({
      employeeId: req.user._id,
      checkIn: new Date(),
    });

    res.json(attendance);
  } catch (err) {
    console.error("CHECK-IN ERROR:", err);
    res.status(500).json({ message: "Check-in failed" });
  }
};
/* CHECK OUT */

exports.checkOut = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      employeeId: req.user._id,
      checkOut: { $exists: false },
      createdAt: { $gte: today },
    });

    if (!attendance) {
      return res
        .status(400)
        .json({ message: "No active check-in found" });
    }

    attendance.checkOut = new Date();

    const diff =
      (attendance.checkOut - attendance.checkIn) / (1000 * 60 * 60);

    attendance.totalHours = Math.round(diff * 100) / 100;

    await attendance.save();

    res.json(attendance);
  } catch (err) {
    console.error("CHECK-OUT ERROR:", err);
    res.status(500).json({ message: "Check-out failed" });
  }
};


/* GET MY ATTENDANCE */
exports.getMyAttendance = async (req, res) => {
  try {
    const { month } = req.query;

    let query = { employeeId: req.user._id };

    if (month) {
      const start = new Date(`${month}-01`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);

      query.createdAt = { $gte: start, $lt: end };
    }

    const records = await Attendance.find(query).sort({ createdAt: -1 });

    const formatted = records.map(r => ({
      date: r.createdAt.toISOString().split("T")[0],
      checkIn: r.checkIn,
      checkOut: r.checkOut,
      totalHours: r.totalHours || 0,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("MY ATTENDANCE ERROR:", err);
    res.status(500).json({ message: "Failed to load attendance" });
  }
};

/*Get All Attendance*/
exports.getAllAttendance = async (req, res) => {
  try {
    const { month } = req.query;

    let query = {};

    if (month) {
      const start = new Date(`${month}-01`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);

      query.createdAt = {
        $gte: start,
        $lt: end,
      };
    }

    const records = await Attendance.find(query)
      .populate("employeeId", "name email")
      .sort({ createdAt: -1 });

    const formatted = records.map(r => ({
      employee: r.employeeId?.name || "Unknown",
      date: r.createdAt.toISOString().split("T")[0],
      checkIn: r.checkIn,
      checkOut: r.checkOut,
      totalHours: r.totalHours || 0,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("ATTENDANCE ERROR:", err);
    res.status(500).json({ message: "Failed to fetch attendance" });
  }
};