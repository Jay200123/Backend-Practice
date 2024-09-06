const mongoose = require("mongoose");
const { RESOURCE, STATUSCODE } = require("../constants/index");
const { logger } = require("../utils/index.js");

const connectDB = async () => {
  try {
    mongoose.set(RESOURCE.STRICT, false);
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    logger.info(err);
    process.exit(STATUSCODE.ONE);
  }
};

module.exports = connectDB;
