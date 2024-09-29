const { createTransport } = require('nodemailer');
const { RESOURCE } = require("../constants/index");

const transporter = createTransport({
    service: RESOURCE.GMAIL,   
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

module.exports = transporter;