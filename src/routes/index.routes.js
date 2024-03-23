import prodsRouter from "./prodsRouter.routes.js"
import cartsRouter from "./cartsRouter.routes.js"
import loginRouter from "./loginRouter.routes.js"
import chatRouter from "./dbChat.routes.js"

const indexRouter = app => {
    
  app.use('/api/products', prodsRouter)
  app.use('/api/carts', cartsRouter)
  app.use('/api/sessions', loginRouter)
  app.use('/api/chat', chatRouter)
  }

export default indexRouter