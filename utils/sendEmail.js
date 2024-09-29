const transporter = require(".././config/index");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const mail = path.join(__dirname, "../views/index.html");
const content = fs.readFileSync(mail, "utf8"); 

const template = handlebars.compile(content);

const sendEmail = (email, randomCode) => {
  const replacement = {
    randomCode: randomCode,
  };

  const index = template(replacement);

  return transporter.sendMail({
    from: process.env.EMAIL,
    to: `${email}`,
    subject: "Reset Account Password",
    html: index,
  });
};

module.exports = sendEmail;