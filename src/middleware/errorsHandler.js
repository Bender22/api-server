const ERRORS = {
  UnauthorizedError: (err, res) => res.status(err.status).json({ name: err.name, message: err.message, status: err.status, err: { err } })

}
export default (err, req, res, next) => {
  const error = ERRORS[err.name]
  error(err, res)
  // next()
}
