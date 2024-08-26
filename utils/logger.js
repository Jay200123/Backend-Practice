const winston = require("winston");
const { RESOURCE } = require("../constants/index.js");

const logger = winston.createLogger({
  level: RESOURCE.INFO,
  format: winston.format.printf(({ message }) => {
    return message;
  }),

  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: RESOURCE.SERVER_LOG }),
  ],
});

module.exports = logger;
