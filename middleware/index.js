const { errorJson, errorHandler } = require("./errorJson");
const generateJwtToken = require("./generateJwtToken");
const sendToken = require("./sendToken");
const removeToken = require("./removeToken");
const { isAuthenticated, userRole } = require("./auth");

module.exports = {
  errorJson,
  errorHandler,
  generateJwtToken,
  sendToken,
  removeToken,
  isAuthenticated,
  userRole,
};
