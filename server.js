const { app, express } = require("./config/express-config.js");
const { errorJson, errorHandler } = require("./middleware/errorJson");
const logger = require("./utils/logger.js");
const mongoose = require("mongoose");
const { RESOURCE, STATUSCODE } = require("./constants/index.js");

const globalEnvironment = require("./config/env-config.js");
globalEnvironment();
const connectDB = require("./config/db-config.js");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes/index.js");

app.use(`${RESOURCE.API}${RESOURCE.V1}`, routes);
app.get("/", async (req, res, next) => {
  const data = { message: "Express Server Running Successfully..." };
  res.status(200).json(data);
});

app.all("*", (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.status = STATUSCODE.NOT_FOUND;
  next(error);
});

app.use(errorJson);
app.use(errorHandler);

mongoose.connection.once(RESOURCE.OPEN, () => {
  app.listen(process.env.PORT);
  logger.info(`Server running on ${process.env.NODE_ENV}`);
  logger.info(`Mongoose Database connection established successfully`);
});

mongoose.connection.on(RESOURCE.ERROR, (err) => {
  logger.error(`Mongo DB connection failed ${err}`);
  process.exit(STATUSCODE.ONE);
});
