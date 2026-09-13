const { OAuth2Client } = require('google-auth-library')

const signInService = require('../../service/auth/signInService.js')

const oAuthGoogleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const connectDb = require('../../config/db.js')


exports.signUp = (req, res, next) => {
  try {

  } catch (error) {

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
    }

    return res.status(200).send(
      {
        user,
        sub,
        email,
        name
      }
    )

  } catch (error) {

    next(error)

  }

}