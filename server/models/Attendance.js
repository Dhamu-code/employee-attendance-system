const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkIn: Date,
    checkOut: Date,
    totalHours: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
