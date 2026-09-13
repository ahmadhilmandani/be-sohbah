const mysql = require('mysql2/promise')

let pool

async function connectDb() {
  if (!pool) {
    pool = await mysql.createPool(
      {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,

        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      }
    )
  }
  return pool
}

module.exports = connectDb