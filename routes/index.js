const { router } = require('../config/express-config')
const { PATH } = require('../constants/index')
const authRoutes = require('../routes/auth')
const userRoutes = require('../routes/user')
const routers = [
  {
    path: [],
    route: authRoutes
  },
  {
    path: PATH.USERS,
    route: userRoutes
  }
]

routers.map(routes => {
  const { path, route } = routes
  router.use(path, route)
})

module.exports = router
