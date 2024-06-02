const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/admin");

router.post("/register-admin", AdminController.registerAdmin);
router.get("/get-admins", AdminController.admins);
router.post("/get-admin", AdminController.admin);

router.post("/update-admin", AdminController.updateAdmin);
router.post("/update-admin-password", AdminController.updateAdminPassword);

router.post("/toggle-staff", AdminController.toggleStaff);
router.post("/toggle-user", AdminController.toggleUser);

router.post("/add-service", AdminController.addService);
router.post("/modify-service", AdminController.modifyService);
router.post("/toggle-service", AdminController.toggleService);
router.post("/view-services", AdminController.viewServices);

router.post("/get-staff-report", AdminController.staffReport);
router.post("/get-user-report", AdminController.userReport);

module.exports = router;