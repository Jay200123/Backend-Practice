const { STATUSCODE } = require("../constants/index");

const generateRandomCode = () => {
  const length = STATUSCODE.SIX;

  let code = "";

  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * STATUSCODE.TEN); 
  }

  return code;
};

module.exports = generateRandomCode;        
