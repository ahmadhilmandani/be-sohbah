const { connection } = require('mongoose');
const authRepository = require('../../repository/auth/authRepository.js')

const datetimeUtils = require('../../utils/datetime/datetimeUtils.js')

exports.reqValidation = (req) => {

  const requiredReqs = [
    'token'
  ]

  requiredReqs.forEach(val => {

    if (
      !(Object.hasOwn(req, val) == false)
      || !(req[val] == null)
    ) {

      throw new Error(`${val} harus diisi`)

    }

  });

}

exports.insertUser = async (
  connection,
  email,
  name,
  google_sub
) => {

  const createdAt = datetimeUtils.timestampNowSQL()

  const res = await authRepository.insertUser(
    connection,
    email,
    1,
    name,
    google_sub,
    1,
    createdAt
  )

  return res

}

exports.isUserInserted = async (
  connection,
  sub
) => {

  const res = await authRepository.getUserBySub(connection, sub)

  return res

}