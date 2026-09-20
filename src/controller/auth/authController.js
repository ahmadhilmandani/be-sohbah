const { OAuth2Client } = require('google-auth-library');

const signInService = require('../../service/auth/signInService.js');

const mailService = require('../../service/mail/mailService.js');

const oAuthGoogleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const mailUtils = require('../../utils/mailUtils.js')

const otpUtils = require('../../utils/otpUtils.js')

const connectDb = require('../../config/db.js')


exports.signUp = async (req, res, next) => {

  let connection

  try {

    const pool = await connectDb()

    connection = await pool.getConnection()

    await connection.beginTransaction()

    const otpEmailTemplate = await mailUtils
      .otpEmailTemplate(
        otpUtils.generateOtp(),
        'sohbah'
      )

    const result = await mailService.sendMail(
      'ahmadhilmandani01@gmail.com',
      'hello, there!',
      otpEmailTemplate
    )

    await connection.commit()

    return res.status(200).json({
      success: true,
      message: 'Email berhasil dikirim',
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


exports.sendOtp = (req, res, next) => {
  try {

  } catch (error) {

  }
}


exports.otpVerification = (req, res, next) => {
  try {

  } catch (error) {

  }
}


exports.signIn = async (req, res, next) => {

  const pool = await connectDb()

  const connection = await pool.getConnection()

  try {

    await connection.beginTransaction()

    signInService.reqValidation(req)

    const { token } = req.body

    const ticket = await oAuthGoogleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const { sub, email, name } = ticket.getPayload();

    const user = await signInService.isUserInserted(
      connection,
      sub
    )

    if (!user) {

      const insertedUser = await signInService.insertUser(
        connection,
        email,
        0,
        name,
        sub
      )

      if (!insertedUser) {
        throw new Error('Gagal, silahkan coba lagi atau tunggu beberapa saat!')
      }

    }

    await connection.commit()

    return res.status(200).send(
      {
        'id_user': user['id'],
        email,
        name
      }
    )

  } catch (error) {

    await connection.rollback()

    next(error)

  } finally {

    await connection.release()

  }

}