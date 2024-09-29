const { router } = require("../../config/index");
const itemController = require("./controller");
const { PATH, METHOD, ROLE } = require("../../constants/index");
const { isAuthenticated, userRole } = require("../../middleware/index");

const itemRouter = [
  {
    method: METHOD.GET,
    path: PATH.ITEMS,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN],
    handler: itemController.getAllItems,
  },
  {
    method: METHOD.GET,
    path: PATH.ITEM_ID,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN],
    handler: itemController.getOneItem,
  },
  {
    method: METHOD.POST,
    path: PATH.ITEMS,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN],
    handler: itemController.createItem,
  },
  {
    method: METHOD.PATCH,
    path: PATH.EDIT_ITEM_ID,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN],
    handler: itemController.updateItem,
  },
  {
    method: METHOD.DELETE,
    path: PATH.ITEM_ID,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN],
    handler: itemController.deleteOneItem,
  },
];

itemRouter.forEach((route) => {
  const { path, method, middleware = [], role = [], handler } = route;
  router[method](path, middleware.concat(userRole(...role)), handler);
});

module.exports = router;
