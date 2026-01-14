const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance
} = require("../controllers/attendanceController");

router.post("/check-in", protect, checkIn);
router.put("/check-out", protect, checkOut);

router.get("/me", protect, getMyAttendance);
router.get("/all", protect, isAdmin, getAllAttendance);

module.exports = router;

