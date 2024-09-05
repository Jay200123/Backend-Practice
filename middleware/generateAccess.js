const generateToken = require("./generateToken");
const { RESOURCE } = require("../constants/index");

const generateAccessToken = (payload = {}) => {
  const accessToken = generateToken(payload, RESOURCE.ONE_DAY);
  return { access: accessToken };
};

module.exports = generateAccessToken;
