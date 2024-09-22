const service = require('../routes/users/service.js') 
const jwt = require('jsonwebtoken')
const { ErrorHandler } = require('../utils/index.js')
const { STATUSCODE } = require('../constants/index')

const isAuthenticated = async (req, res, next) => {
  if (!req.cookies.token) {
    return next(new ErrorHandler('User must Login First', STATUSCODE.UNAUTHORIZED))
  }

  const decode = jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_SECRET)
  req.user = await service.getById(decode?.id)
  next()
}

const userRole = (...roles) => {
  return (req, res, next) => {
    if (!roles?.includes(req?.user?.role)) {
      return next(
        new ErrorHandler(
          `You are not authorized to access this resource`,
          STATUSCODE.FORBIDDEN
        )
      );
    }
    next();
  }
}

module.exports = { isAuthenticated, userRole }
