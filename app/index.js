const { app, express } = require("../config/express-config.js");
const { errorJson, errorHandler } = require("../middleware/errorJson");
const { RESOURCE, STATUSCODE, PATH } = require("../constants/index.js");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("../routes/index.js");

app.use(`${RESOURCE.API}${RESOURCE.V1}`, routes);

app.get(PATH.INDEX, async (req, res, next) => {
  const data = { message: "Express Server Running Successfully..." };
  res.status(200).json(data);
});

app.all(PATH.NOT_FOUND, (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.status = STATUSCODE.NOT_FOUND;
  next(error);
});

app.use(errorJson);
app.use(errorHandler);

module.exports = app;