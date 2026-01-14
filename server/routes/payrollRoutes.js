const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");
const {
  getMyPayroll,
  getAllPayrolls,
} = require("../controllers/payrollController");

router.get("/me", protect, getMyPayroll);
router.get("/all", protect, isAdmin, getAllPayrolls);

module.exports = router;
