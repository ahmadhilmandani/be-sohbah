const crypto = require('crypto')

exports.generateOtp = () => {

  return crypto
    .randomInt(100000, 999999)
    .toString()

}

exports.hashOtp = (otp) => {

  return crypto
    .createHmac('sha256', process.env.OTP_SECRET)
    .update(otp)
    .digest()

}