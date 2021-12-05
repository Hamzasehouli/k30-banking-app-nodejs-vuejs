const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// router.use(authController.isLoggedin);
// router.use(authController.protect('admin'));
router.route('/signup').post(authController.signup);
router.post('/login', authController.login);
router.post('/isloggedin', authController.isLoggedin);
// router.patch("/deactivate", authController.deactivate);
// router.patch("/updateData", authController.updateData);

module.exports = router;
