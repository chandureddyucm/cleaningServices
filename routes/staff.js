const express = require("express");
const router = express.Router();

const StaffController = require("../controllers/staff");

router.post("/register-staff", StaffController.registerStaff);
router.get("/get-staffs", StaffController.staffs);
router.post("/get-staff", StaffController.staff);

router.post("/update-staff", StaffController.updateStaff);
router.post("/update-staff-password", StaffController.updateStaffPassword);
router.post("/toggle-staff", StaffController.toggleStaff);

module.exports = router;