const service = require("../service/userService");
const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../utils/index.js");
const { STATUSCODE } = require("../constants/index");

const isAuthenticated = async (req, res, next) => {
  const hasToken = req.cookies.token;

  if (!hasToken) {
    return next(new ErrorHandler("Login First", STATUSCODE.UNAUTHORIZED));
  }

  const decode = jwt.verify(hasToken, process.env.ACCESS_TOKEN_SECRET);
  const data = await service.getById(decode?.id);
  req.user = data;
  next();
};

const userRole = (...roles) => {
  return (req, res, next) => {
    console.log(req.user);
    // if (!roles.includes(req.user.role)) {
    //   return next(
    //     new ErrorHandler(
    //       `${req.user.role} is not authorized to access this resource`,
    //       STATUSCODE.FORBIDDEN
    //     )
    //   );
    // }
  };
};

module.exports = { isAuthenticated, userRole };
