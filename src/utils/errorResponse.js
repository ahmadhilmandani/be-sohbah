const errorResponse = (err, req, res, next) => {
  const status = err.statusCode || 500

  res.status(status).json({
    success: false,
    msg: err.message || "Internal Server Error",
    stack: err.stack || null
  })
}

module.exports = errorResponse