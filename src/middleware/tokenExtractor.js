import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const authorization = req.get('authorization')
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('baerer')) {
    token = authorization.substring(7)
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log(decodedToken)
}
