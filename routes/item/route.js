const { router } = require('../../config/index')
const itemController = require('./controller')
const { PATH, METHOD } = require('../../constants/index')

const itemRouter = [
  {
    method: METHOD.GET,
    path: PATH.ITEMS,
    handler: itemController.getAllItems
  },
  {
    method: METHOD.GET,
    path: PATH.ITEM_ID,
    handler: itemController.getOneItem
  },
  {
    method: METHOD.POST,
    path: PATH.ITEMS,
    handler: itemController.createItem
  },
  {
    method: METHOD.PATCH,
    path: PATH.EDIT_ITEM_ID,
    handler: itemController.updateItem
  },
  {
    method: METHOD.DELETE,
    path: PATH.ITEM_ID,
    handler: itemController.deleteOneItem
  }
]

itemRouter.forEach(route => {
  const { path, method, handler } = route
  router[method](path, handler)
});

module.exports = router;
