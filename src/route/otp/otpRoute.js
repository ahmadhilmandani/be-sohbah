const express = require('express');
const otpController = require('../../controller/otp/otpController');

const router = express.Router();

router.post('/send', otpController.sendOtp);

// router.post('verification');

module.exports = router;