const { RESOURCE } = require("../constants/index.js");

const removeCookie = (res, message = {}, statusCode) => {
  return res
    .status(statusCode)
    .cookie(RESOURCE.TOKEN, "", {
      expires: new Date(0),
      httpOnly: true,
    })
    .json({
      success: true,
      message: message,
    });
};

module.exports = removeCookie;
