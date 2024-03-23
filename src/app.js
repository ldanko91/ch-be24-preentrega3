import express from "express";
import { serverConfig } from "./config/serverConfig.config.js";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index.routes.js";
import { mongoConnection } from "./utils/mongo/mongoConnection.js";
import passport from "passport";
import initializePassport from "./utils/passport/initializePassport.service.js";
import handlebars from "express-handlebars";

//CONFIG SERVER y DB
const app = express()
const httpServer = app.listen(serverConfig.ExpressPort,
    () => console.log(`Servidor conectado al puerto: ${serverConfig.ExpressPort}`))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
indexRouter(app)
mongoConnection()

//CONFIG PASSPORT
initializePassport()
app.use(passport.initialize())

//config HBS!
app.engine('handlebars', handlebars.engine());
app.set('views', process.cwd() + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(process.cwd() + '/public'))