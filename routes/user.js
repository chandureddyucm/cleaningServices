const express = require('express');
const router = express.Router();

const UserController = require("../controllers/user");

router.post('/register-user', UserController.registerUser);
router.get('/get-users', UserController.users);
router.post('/get-user', UserController.user);

router.post('/update-user', UserController.updateUser);
router.post('/update-user-password', UserController.updateUserPassword);
router.post('/toggle-user', UserController.toggleUser );

module.exports = router;