const { OAuth2Client } = require('google-auth-library');

const signInService = require('../../service/auth/signInService.js');

const authService = require('../../service/auth/authService.js');

const signUpService = require('../../service/auth/signUpService.js');

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

    const {
      email,
      password,
      name
    } = req.body


    signUpService.reqValidation(req)


    const existingUser = await authService.isUserInserted(
      connection,
      null,
      email
    )


    if (existingUser) {

      if (
        existingUser.password_hash
        && existingUser.google_sub
      ) {

        await connection.rollback()

        return res.status(409).json({
          success: false,
          message: 'Email sudah terdaftar. Silakan login.'
        })

      }

      if (
        !existingUser.password_hash
        && existingUser.google_sub
      ) {

        await connection.rollback()

        return res.status(409).json({
          success: false,
          message: 'Email sudah terdaftar menggunakan Google. Silakan login dengan Google.'
        })

      }

      await connection.rollback()

      return res.status(409).json({
        success: false,
        message: 'Email sudah terdaftar.'
      })

    }

    const passwordHash = await bcrypt.hash(
      password,
      12
    )

    const userId = await signUpService.insertUser(
      connection,
      {
        email,
        password_hash: passwordHash,
        name,
        google_sub: null,
        is_active: 1
      }
    )

    await connection.commit()

    return res.status(201).json({
      success: true,
      message: 'Registrasi berhasil.',
      data: {
        id: userId,
        email,
        name
      }
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

    const user = await authService.isUserInserted(
      connection,
      sub,
      null
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