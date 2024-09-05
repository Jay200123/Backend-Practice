const { NOT_FOUND } = require("./statusCode");

module.exports = {
  INDEX: "/",
  NOT_FOUND: "*",
  USERS: "/users",
  USER_ID: "/user/:id",
  EDIT_USER_ID: "/user/edit/:id",
  LOGIN: "/login",
  LOGOUT: "/logout",
};
