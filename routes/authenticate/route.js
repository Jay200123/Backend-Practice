const { router } = require('../../config/index')
const { METHOD, PATH } = require('../../constants/index') 
const authController = require('./controller');
const userController = require('../users/controller'); 

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
  },
  {
    method: METHOD.POST,
    path: PATH.USER_OTP,
    middleware: [],
    role: [],
    handler: userController.sendEmailOTP,
  },
  {
    method: METHOD.PATCH,
    path: PATH.USER_RESET_PASSWORD, 
    middleware: [],  
    role: [],  
    handler: userController.resetPassword,    
  }
]

authRoutes.forEach(route => {
  const { method, path, handler } = route
  router[method](path, handler)
})

module.exports = router
