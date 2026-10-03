const authRepository = require('../../repository/auth/authRepository.js')

const datetimeUtils = require('../../utils/datetime/datetimeUtils.js')

exports.reqValidation = (req) => {

  const requiredReqs = [
    'email',
    'password',
    'name'
  ]

  requiredReqs.forEach(val => {

    if (
      !Object.hasOwn(req, val)
      || req[val] == null
      || req[val] === ''
    ) {
      throw new Error(`${val} harus diisi`)
    }

  })

}

exports.getUserByEmail = async (
  connection,
  email
) => {

  return await authRepository.getUserByEmail(
    connection,
    email
  )

}

exports.insertUser = async (
  connection,
  data
) => {

  const createdAt = datetimeUtils.timestampNowSQL()

  return await authRepository.insertUser(
    connection,
    data.email,
    data.password_hash,
    data.name,
    data.google_sub ?? null,
    data.is_active ?? 1,
    createdAt
  )

}

