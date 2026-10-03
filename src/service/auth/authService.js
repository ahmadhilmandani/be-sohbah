exports.isUserInserted = async (
  connection,
  sub = null,
  email = null
) => {

  let res

  if (sub) {

    res = await authRepository.getUserBySub(connection, sub)

  } else if (email) {

    res = await authRepository.getUserByEmail(connection, email)

  }

  return res

}