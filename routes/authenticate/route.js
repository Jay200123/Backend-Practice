const { router } = require('../../config/index')
const { METHOD, PATH } = require('../../constants/index') 
const authController = require('./controller');

const authRoutes = [
  {
    method: METHOD.POST,
    path: PATH.USERS,
    role: [],
    handler: authController.registerUser
  },
  {
    method: METHOD.POST,
    path: PATH.LOGIN,
    handler: authController.loginUser
  },
  {
    method: METHOD.GET,
    path: PATH.LOGOUT,
    handler: authController.logoutUser
  }
]

authRoutes.forEach(route => {
  const { method, path, handler } = route
  router[method](path, handler)
})

module.exports = router
