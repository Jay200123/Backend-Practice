const ErrorHandler = require("../utils/errorHandler");
const { STATUSCODE, ERROR } = require("../constants/index");

const errorJson = (err, req, res, next) => {
  if (!(err instanceof ErrorHandler)) {
    err = new ErrorHandler(err.message || ERROR.INTERNAL_SERVER_ERROR);
  }
  next(err);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || STATUSCODE.SERVER_ERROR;
  const message = err.message || ERROR.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    error: {
      message: message,
    },
  });
 
};

module.exports = { errorJson, errorHandler };
