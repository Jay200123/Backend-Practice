const { STATUSCODE } = require("../constants/index");

const SuccessHandler = (res, message, details, meta={}) => {
  res.status(STATUSCODE.SUCCESS).json({
    success: true,
    message: message,
    details: details,
    meta: meta
  });
};

module.exports = SuccessHandler;
