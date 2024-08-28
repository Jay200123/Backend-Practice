const globalEnvironment = () => {
  require("dotenv").config({
    path: "./config/.env",
  });
};

module.exports = globalEnvironment ;
