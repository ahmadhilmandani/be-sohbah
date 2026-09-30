const { timestampNowSQL } = require("../../utils/datetime/datetimeUtils");

exports.getOtp = async (connection, where) => {
  const conditions = [];
  const params = [];

  if (where.email !== undefined) {
    conditions.push('email = ?');
    params.push(where.email);
  }

  if (where.code_hash !== undefined) {
    conditions.push('code_hash = ?');
    params.push(where.code_hash);
  }

  if (where.user_id !== undefined) {
    conditions.push('user_id = ?');
    params.push(where.user_id);
  }

  if (where.purpose !== undefined) {
    conditions.push('purpose = ?');
    params.push(where.purpose);
  }

  if (where.expires_at !== undefined) {
    conditions.push('expires_at = ?');
    params.push(where.expires_at);
  }

  if (
    where.created_at_start !== undefined
    && where.created_at_end !== undefined
  ) {
    conditions.push('created_at >= ?');
    conditions.push('created_at < ?');
    params.push(where.created_at_start);
    params.push(where.created_at_end);
  }

  if (conditions.length === 0) {
    throw new Error('OTP search condition is required');
  }

  const sql = `
    SELECT
      *
    FROM
      otp_codes
    WHERE
      ${conditions.join(' AND ')}
    ORDER BY
      id DESC
  `;

  const [rows] = await connection.execute(sql, params);

  return rows ?? null;
};


exports.insertOtp = async (
  connection,
  email,
  purpose,
  code_hash,
  expires_at
) => {

  const now = timestampNowSQL()

  const sql = `
    INSERT INTO
      otp_codes
      (
        email,
        purpose,
        code_hash,
        expires_at,
        used_at,
        attempt_count,
        max_attempts,
        created_at
      )
    VALUES
      (
        ?,
        ?,
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
    purpose,
    code_hash,
    expires_at,
    null,
    0,
    5,
    now
  ]

  const [row] = await connection.execute(sql, params)

  return row.insertId ?? null;

}

