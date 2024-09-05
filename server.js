const logger = require("./utils/logger.js");
const mongoose = require("mongoose");
const { RESOURCE, STATUSCODE } = require("./constants/index.js");

const app = require("./app/index.js");

const globalEnvironment = require("./config/env-config.js");
globalEnvironment();

const connectDB = require("./config/db-config.js");
connectDB();

mongoose.connection.once(RESOURCE.OPEN, () => {
  app.listen(process.env.PORT);
  logger.info(`Server running on ${process.env.NODE_ENV}`);
  logger.info(`Mongoose Database connection established successfully`);
});

mongoose.connection.on(RESOURCE.ERROR, (err) => {
  logger.error(`Mongo DB connection failed ${err}`);
  process.exit(STATUSCODE.ONE);
});
