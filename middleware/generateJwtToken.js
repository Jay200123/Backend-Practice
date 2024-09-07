const jwt = require("jsonwebtoken");

const generateJwtToken = function(Id){
    return jwt.sign({ id:Id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRES_TIME
    });
  
  };
  
  module.exports = generateJwtToken;
