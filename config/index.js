const cloudinary = require("./cloudinary");
const connectDB = require("./db-config");
const globalEnvironment = require("./env-config");
const { express, router, app } = require("./express-config");

module.exports = {
  express,
  router,
  app,
  cloudinary,
  connectDB,
  globalEnvironment,
};
