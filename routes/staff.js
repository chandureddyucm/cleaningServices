const express = require("express");
const router = express.Router();

const StaffController = require("../controllers/staff");

router.post("/register-staff", StaffController.registerStaff);
router.post("/get-staffs", StaffController.staffs);
router.post("/get-staff", StaffController.staff);

router.post("/update-staff", StaffController.updateStaff);
router.post("/update-staff-password", StaffController.updateStaffPassword);
router.post("/toggle-staff", StaffController.toggleStaff);

router.post("/assign-service", StaffController.assignService);
router.post("/complete-service", StaffController.completeService);
router.post("/get-services", StaffController.getServices);
router.post("/get-assigned-services", StaffController.getAssignedServices);

module.exports = router;