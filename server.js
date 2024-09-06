const { globalEnvironment, connectDB } = require("./config/index.js");
const { RESOURCE, STATUSCODE } = require("./constants/index.js");
const { logger } = require("./utils/index.js");
const mongoose = require("mongoose");

globalEnvironment();
connectDB();
const app = require("./app/index.js");

mongoose.connection.once(RESOURCE.OPEN, () => {
  app.listen(process.env.PORT);
  logger.info(`Server running on ${process.env.NODE_ENV}`);
  logger.info(`Mongoose Database connection established successfully`);
});

mongoose.connection.on(RESOURCE.ERROR, (err) => {
  logger.error(`Mongo DB connection failed ${err}`);
  process.exit(STATUSCODE.ONE);
});
