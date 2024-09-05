const jwt = require("jsonwebtoken");

const generateJwtToken = function(Id){
    return jwt.sign({ id:Id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRES_TIME
    });
  
  };
  
  module.exports = generateJwtToken;

// const token = require("jsonwebtoken");
// const { RESOURCE } = require("../constants/index");

// const generateToken = (payload = {}, expiresIn = RESOURCE.ONE_DAY) => {
//     return token.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn})
// };

// module.exports = generateToken;
