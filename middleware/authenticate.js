const service = require('../service/userService.js')
const jwt = require('jsonwebtoken')
const { ErrorHandler } = require('../utils/index.js')
const { STATUSCODE } = require('../constants/index')

const isAuthenticated = async (req, res, next) => {
  if (!req.cookies.token) {
    return next(new ErrorHandler('Login First', STATUSCODE.UNAUTHORIZED))
  }

  const decode = jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_SECRET)
  const data = await service.getById(decode?.id)
  req.user = data
  console.log(req.user);
  next()
}

const userRole = (...roles) => {
  return (req, res, next) => {
    // console.log(req.user);
    next()
    // if (!roles.includes(req.user.role)) {
    //   return next(
    //     new ErrorHandler(
    //       `${req.user.role} is not authorized to access this resource`,
    //       STATUSCODE.FORBIDDEN
    //     )
    //   );
    // }
    // next();
  }
}

module.exports = { isAuthenticated, userRole }
