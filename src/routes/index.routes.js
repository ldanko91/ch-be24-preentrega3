import dbProdsRouter from "./dbProds.routes.js"
import dbCartsRouter from "./dbCarts.routes.js"
import loginRouter from "./login.routes.js"

const indexRouter = app => {
    
    app.use('/api/products', dbProdsRouter)
    app.use('/api/carts', dbCartsRouter)
    app.use('/api/sessions', loginRouter)
  }

export default indexRouter