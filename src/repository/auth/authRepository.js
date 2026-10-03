exports.getUserBySub = async (connection, google_sub) => {

  const rawSql = `
    SELECT
      id,
      email,
      name,
      password_hash,
      google_sub,
      email_verified,
      is_active
    FROM
      users
    WHERE
      google_sub = ?
  `;

  const params = [google_sub];

  const [res] = await connection.execute(
    rawSql,
    params
  );

  return res[0] ?? null;

}
exports.getUserByEmail = async (connection, email) => {

  const rawSql = `
    SELECT
      id,
      email,
      name,
      password_hash,
      google_sub,
      email_verified,
      is_active
    FROM
      users
    WHERE
      email = ?
  `;

  const params = [email];

  const [res] = await connection.execute(
    rawSql,
    params
  );

  return res[0] ?? null;

}


exports.insertUser = async (
  connection,
  email,
  password_hash,
  name,
  google_sub,
  is_active,
  created_at
) => {

  const rawSql = `
    INSERT INTO users
    (
      email,
      password_hash,
      name,
      google_sub,
      is_active,
      created_at
    )
    VALUES
    (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
    )
  `

  const params = [
    email,
    password_hash,
    name,
    google_sub,
    is_active,
    created_at
  ]

  const [res] = await connection.execute(
    rawSql,
    params
  )

  return res.insertId
}