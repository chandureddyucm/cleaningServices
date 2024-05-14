const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/admin");

router.post("/register-admin", AdminController.registerAdmin);
router.get("/get-admins", AdminController.admins);
router.post("/get-admin", AdminController.admin);

router.post("/update-admin", AdminController.updateAdmin);
router.post("/update-admin-password", AdminController.updateAdminPassword);

module.exports = router;