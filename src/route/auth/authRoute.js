const express = require('express');

const router = express.Router();

const authController = require('../../controller/auth/authController');

router.post('/sign-in', authController.signIn)

router.post('/sign-up', authController.signUp)

router.post('/send-otp', () => { })

router.post('/otp-verification', () => { })


module.exports = router
