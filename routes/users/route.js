const { router } = require("../../config/index.js");
const { METHOD, PATH, ROLE } = require("../../constants/index.js");
const userController = require("./controller.js");
const { isAuthenticated, userRole } = require("../../middleware/index.js");

const userRoutes = [
  {
    method: METHOD.GET,
    path: PATH.USERS,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN],
    handler: userController.getAllUsers,
  },
  {
    method: METHOD.GET,
    path: PATH.USER_ID,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN, ROLE.CUSTOMER],
    handler: userController.getOneUser,
  },
  {
    method: METHOD.PATCH,
    path: PATH.EDIT_USER_ID,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN, ROLE.CUSTOMER],
    handler: userController.updateUser,
  },
  {
    method: METHOD.DELETE,
    path: PATH.USER_ID,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN],
    handler: userController.deleteUser,
  },
  {
    method: METHOD.POST,
    path: PATH.USER_OTP,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN, ROLE.CUSTOMER],
    handler: userController.sendEmailOTP,
  },
];

userRoutes.forEach((route) => {
  const { method, path, middleware = [], role = [], handler } = route;
  router[method](path, middleware.concat(userRole(...role)), handler);
});

module.exports = router;
