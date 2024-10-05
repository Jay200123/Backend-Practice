const { router } = require('../config/express-config');
const { PATH } = require('../constants/index');
const authRoutes = require('../routes/authenticate/route');
const userRoutes = require('../routes/users/route');
const itemRoutes = require("../routes/item/route");
const accessoriesRoutes = require("../routes/accessories/route"); 

const routers = [
  {
    path: [],
    route: authRoutes
  },
  {
    path: PATH.USERS,
    route: userRoutes
  },
  {
    path: PATH.ITEMS,
    route: itemRoutes
  },
  {
    path: PATH.ACCESSORIES,
    route: accessoriesRoutes  
  }
]

routers.map(routes => {
  const { path, route } = routes
  router.use(path, route)
})

module.exports = router
