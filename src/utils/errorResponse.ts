const ErrorResponse = (err, message, statusCode) => {
  err.msg = message
  err.details = err.message
  err.statusCode = statusCode || 500;
}

export default ErrorResponse