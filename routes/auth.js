const { router } = require('../config/express-config')
const { METHOD, PATH } = require('../constants/index')
const userController = require('../controllers/userController')

const authRoutes = [
  {
    method: METHOD.POST,
    path: PATH.USERS,
    role: [],
    handler: userController.registerUser
  },
  {
    method: METHOD.POST,
    path: PATH.LOGIN,
    handler: userController.loginUser
  },
  {
    method: METHOD.GET,
    path: PATH.LOGOUT,
    handler: userController.logoutUser
  }
]

authRoutes.forEach(route => {
  const { method, path, handler } = route
  router[method](path, handler)
})

module.exports = router
