const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/signup').post(authController.signup);
router.post('/login', authController.login);
// router.post("/protect", authController.protect);
// router.post("/isLoggedin", authController.isLoggedin);
// router.patch("/deactivate", authController.deactivate);
// router.patch("/updateData", authController.updateData);

module.exports = router;
