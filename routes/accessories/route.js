const { router } = require('../../config/index')
const accessoriesController = require('./controller')
const { PATH, METHOD, ROLE } = require('../../constants/index')
const { isAuthenticated, userRole } = require('../../middleware/index')
const method = require('../../constants/method')

const accessoryController = [
  {
    method: METHOD.GET,
    path: PATH.ACCESSORIES,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN],
    handler: accessoriesController.getAllAccessories
  },
  {
    method: METHOD.GET,
    path: PATH.ACCESSORY_ID,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN],
    handler: accessoriesController.getOneAccessory
  },
  {
    method: METHOD.POST,
    path: PATH.ACCESSORIES,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN],
    handler: accessoriesController.createAccessory
  },
  {
    method: METHOD.PATCH,
    path: PATH.EDIT_ACCESSORY_ID,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN],
    handler: accessoriesController.updateAccessory
  },
  {
    method: METHOD.DELETE,
    path: PATH.ACCESSORY_ID,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN],
    handler: accessoriesController.deleteOneAccessory
  }
]

accessoryController.forEach(route => {
  const { path, method, middleware = [], role = [], handler } = route
  router[method](path, middleware.concat(userRole(...role)), handler)
})

module.exports = router
