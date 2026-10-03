const { timestampNowSQL } = require("../../utils/datetime/datetimeUtils");

exports.getOtp = async (connection, where) => {
  const conditions = [];
  const params = [];

  if (where.email !== undefined) {
    conditions.push('AND email = ?');
    params.push(where.email);
  }

  if (where.code_hash !== undefined) {
    conditions.push('AND code_hash = ?');
    params.push(where.code_hash);
  }

  if (where.user_id !== undefined) {
    conditions.push('AND user_id = ?');
    params.push(where.user_id);
  }

  if (where.purpose !== undefined) {
    conditions.push('AND purpose = ?');
    params.push(where.purpose);
  }

  if (where.expires_at !== undefined) {
    conditions.push('AND expires_at = ?');
    params.push(where.expires_at);
  }

  if (where.expires_at_start !== undefined) {
    conditions.push('AND expires_at >= ?');
    params.push(where.expires_at_start);
  }

  if (
    where.created_at_start !== undefined
  ) {
    conditions.push('AND created_at >= ?');
    params.push(where.created_at_start);
  }

  if (
    where.created_at_end !== undefined
  ) {
    conditions.push('AND created_at < ?');
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
      used_at IS NULL
      ${conditions.join(' ')}
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

exports.setOtpUsed = async (
  connection,
  codeHash
) => {

  const now = timestampNowSQL()

  const sql = `
    UPDATE
      otp_codes
    SET
      used_at = ?
    WHERE
      code_hash = ?
  `

  const params = [
    now,
    codeHash
  ]

  const [row] = await connection.execute(sql, params)

  return row.affectedRows ?? null;

}

