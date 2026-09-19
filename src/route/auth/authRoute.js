const express = require('express');

const router = express.Router();

const authController = require('../../controller/auth/authController');

router.post('/sign-in', authController.signIn)

router.post('/sign-up', authController.signUp)

router.post('/send-otp', () => { })

router.post('/otp-verification', () => { })


module.exports = router



// exports.signUp = async (req, res, next) => {

//   try {

//     const result = await mailService.sendMail(
//       'ahmadhilmandani01@gmail.com',
//       'Test Email',
//       '<h1>Hello!</h1><p>Email berhasil dikirim.</p>'
//     )

//     console.log('SEND MAIL RESULT:', result)

//     res.json({
//       success: true,
//       message: 'Email berhasil dikirim'
//     })

//   } catch (error) {

//     console.error('SEND MAIL ERROR:', error)

//     next(error)

//   }
// }