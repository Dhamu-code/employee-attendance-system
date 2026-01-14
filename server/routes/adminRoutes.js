const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");
const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  enableEmployee,
  getDisabledEmployees,
  resetEmployeePassword
} = require("../controllers/adminController");

router.post("/employee", protect, isAdmin, createEmployee);
router.get("/employees", protect, isAdmin, getEmployees);
router.get("/employee/:id", protect, isAdmin, getEmployeeById);
router.put("/employee/:id", protect, isAdmin, updateEmployee);
router.delete("/employee/:id", protect, isAdmin, deleteEmployee);
router.put("/employee/:id/enable", protect, isAdmin, enableEmployee);
router.get("/employees/disabled", protect, isAdmin, getDisabledEmployees);
router.put(
  "/employee/:id/reset-password",
  protect,
  isAdmin,
  resetEmployeePassword
);



module.exports = router;
