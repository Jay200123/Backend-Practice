const { router } = require("../config/express-config");
const { METHOD, PATH } = require("../constants/index");
const userController = require("../controllers/userController");

const userRoutes = [
  {
    method: METHOD.GET,
    path: PATH.USERS,
    handler: userController.getAllUsers,
  },
  {
    method: METHOD.GET,
    path: PATH.USER_ID,
    handler: userController.getOneUser,
  },
  {
    method: METHOD.POST,
    path: PATH.USERS,
    handler: userController.createUser,
  },
  {
    method: METHOD.PATCH,
    path: PATH.EDIT_USER_ID,
    handler: userController.updateUser,
  },
  {
    method: METHOD.DELETE,
    path: PATH.USER_ID,
    handler: userController.deleteUser,
  },
];

userRoutes.forEach((route) => {
  const { method, path, handler } = route;
  router[method](path, handler);
});

module.exports = router;
