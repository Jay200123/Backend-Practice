const token = require("jsonwebtoken");
const { RESOURCE } = require("../constants/index");

const generateToken = (payload = {}, expiresIn = RESOURCE.ONE_DAY) => {
    return token.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn})
};

module.exports = generateToken;
