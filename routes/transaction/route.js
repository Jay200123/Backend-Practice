const { router } = require('../../config/index')
const { isAuthenticated, userRole } = require("../../middleware/index")
const transactionController = require('./controller')
const { METHOD, PATH, ROLE } = require('../../constants/index')

const transactionRoutes = [
  {
    method: METHOD.GET,
    path: PATH.TRANSACTIONS,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN],
    handler: transactionController.getAllTransaction
  },
  {
    method: METHOD.GET,
    path: PATH.TRANSACTION_ID,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN],
    handler: transactionController.getOneTransaction
  },
  {
    method: METHOD.POST,
    path: PATH.TRANSACTIONS,
    middleware: [isAuthenticated],
    role: [ROLE.ADMIN],
    handler: transactionController.createTransaction
  }
]

transactionRoutes.forEach(route => {
  const { method, path, middleware, role, handler } = route
  router[method](path, middleware.concat(userRole(...role)), handler)
})

module.exports = router
