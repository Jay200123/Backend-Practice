const { RESOURCE } = require("./constants/index.js");
const { app } = require("./config/express-config.js");
const routes = require("./routes/index.js");

require("dotenv").config({
  path: "./config/.env",
});
const connectDB = require("./config/config.js");
connectDB();

app.use(`${RESOURCE.API}${RESOURCE.V1}`, routes);
app.get("/", async (req, res, next) => {
  console.log("test!");
});

const port = process.env.PORT;
const dev = process.env.NODE_ENV;

app.listen(port, () => {
  console.log(`Server Running on PORT ${port} on ${dev}`);
});
