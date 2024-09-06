const { router } = require("../config/express-config");
const { METHOD, PATH, ROLE } = require("../constants/index");
const userController = require("../controllers/userController");
const { isAuthenticated, userRole } = require("../middleware/index.js");

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
    role: [ROLE.ADMIN],
    handler: userController.getOneUser,
  },
  {
    method: METHOD.POST,
    path: PATH.USERS,
    handler: userController.registerUser,
  },
  {
    method: METHOD.POST,
    path: PATH.LOGIN,
    handler: userController.loginUser,
  },
  {
    method: METHOD.GET,
    path: PATH.LOGOUT,
    handler: userController.logoutUser,
  },
  {
    method: METHOD.PATCH,
    path: PATH.EDIT_USER_ID,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN],
    handler: userController.updateUser,
  },
  {
    method: METHOD.DELETE,
    path: PATH.USER_ID,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN],
    handler: userController.deleteUser,
  },
];

userRoutes.forEach((route) => {
  const { method, path, middleware = [], role = [], handler } = route;
  router[method](path, middleware, userRole(...role), handler);
});

module.exports = router;
