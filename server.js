const { RESOURCE } = require("./constants/index.js");
const { app } = require("./config/express-config.js");

require("dotenv").config({
  path: "./config/.env",
});
const connectDB = require("./config/config.js");
connectDB();

const routes = require("./routes/index.js");
app.use(`${RESOURCE.API}${RESOURCE.V1}`, routes);
app.get("/", async (req, res, next) => {
  const data = { message: "Express Server Running Successfully..." };

  res.status(200).json(data);
});

const port = process.env.PORT;
const dev = process.env.NODE_ENV;

app.listen(port, () => {
  console.log(`Server Running on PORT ${port} on ${dev}`);
});
