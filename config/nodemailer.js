const { createTransport } = require('nodemailer');
const { RESOURCE } = require("../constants/index");
const globalEnviroment = require("./env-config");
globalEnviroment();

const transporter = createTransport({
    service: RESOURCE.GMAIL,   
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = transporter;