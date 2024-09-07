const { RESOURCE } = require("../constants/index");
const generateJwtToken = require("./generateJwtToken");

const sendToken = (res, data, message = {}, statusCode) => {
  const access = generateJwtToken(data?._id);

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie(RESOURCE.TOKEN, access, options).json({
    sucess: true,
    message: message,
    data,
    access,
  });
};

module.exports = sendToken;

// const generateToken = require("./generateToken");
// const { RESOURCE } = require("../constants/index");

// const generateAccessToken = (payload = {}) => {
//   const accessToken = generateToken(payload, RESOURCE.ONE_DAY);
//   return { access: accessToken };
// };

// module.exports = generateAccessToken;
