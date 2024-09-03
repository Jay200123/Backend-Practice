const bcrypt = require("bcrypt");

const setPassword = async(password)=>{
    const hashPassword = await bcrypt.hash(password, process.env.SALT_NUMBER);
    return hashPassword;
};

module.exports = setPassword;