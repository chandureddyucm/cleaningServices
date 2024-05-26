const express = require('express');
const router = express.Router();

const UserController = require("../controllers/user");

router.post('/register-user', UserController.registerUser);
router.get('/get-users', UserController.users);
router.post('/get-user', UserController.user);

router.post('/update-user', UserController.updateUser);
router.post('/update-user-password', UserController.updateUserPassword);
router.post('/toggle-user', UserController.toggleUser );

router.post('/feedback-service', UserController.feedbackService );
router.post('/book-service', UserController.bookService );
router.post('/cancel-service', UserController.cancelService );
router.post('/get-services', UserController.getServices );
router.post('/pay-service', UserController.payForService);

module.exports = router;