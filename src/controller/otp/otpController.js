const mailService = require('../../service/mail/mailService.js');

const mailUtils = require('../../utils/mailUtils.js')

const otpUtils = require('../../utils/otpUtils.js')

const connectDb = require('../../config/db.js');
const otpService = require('../../service/otp/otpService.js');
const otpRepository = require('../../repository/otp/otpRepository.js');
const { nowIndonesia } = require('../../utils/datetime/datetimeUtils.js');
const { OTP_DURATION_MINUTES } = require('../../const/otpDurationMinutes.js');


exports.sendOtp = async (req, res, next) => {

  let connection

  try {

    const pool = await connectDb()

    connection = await pool.getConnection()

    await connection.beginTransaction()

    const body = req.body

    // validasi input

    // get otp
    const isOtpSent = await otpService.isOtpSent(
      connection,
      body.email,
      body.purpose
    );

    if (
      isOtpSent.hasBeenSent &&
      !isOtpSent.resendState.canResend
    ) {

      throw new Error(`Otp Gagal Dikirim karena melebihi batas permintaan OTP. tunggu sampai ${isOtpSent.resendState.cooldownTime}`)

    }

    const otp = otpUtils.generateOtp()
    const hashedOtp = otpUtils.hashOtp(otp)

    const nowIndo = nowIndonesia()

    const insertedId = await otpRepository.insertOtp(
      connection,
      body.email,
      body.purpose,
      hashedOtp,
      nowIndo.plus({
        minutes: OTP_DURATION_MINUTES
      }).toFormat('yyyy-MM-dd HH:mm:ss')
    )

    if (insertedId === null) {
      throw new Error(`Terjadi kesalahan server, silahkan coba lagi nanti!`)
    }

    const otpEmailTemplate = await mailUtils
      .otpEmailTemplate(
        otp
      )

    const result = await mailService.sendMail(
      body.email,
      'hello, there!',
      otpEmailTemplate
    )

    await connection.commit()

    return res.status(200).json({
      success: true,
      message: 'Email OTP berhasil dikirim',
      data: result
    })

  } catch (error) {

    if (connection) {
      await connection.rollback()
    }

    next(error)

  } finally {

    if (connection) {
      connection.release()
    }

  }

}



