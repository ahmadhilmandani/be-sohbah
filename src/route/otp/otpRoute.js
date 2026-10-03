const express = require('express');
const otpController = require('../../controller/otp/otpController');

const router = express.Router();

router.post('/send', otpController.sendOtp);

router.post('/verify', otpController.verifOtp);

module.exports = router;