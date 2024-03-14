import { config } from "dotenv";
import express from "express";
import indexRouter from "./routes/index.routes.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import passport from "passport";
import initializePassport from "./config/passportConfig.js";
import __dirname from "./dirname.js";

//CONFIG SERVER
config();
const app = express()
const httpServer = app.listen(process.env.EXPRESS_PORT, 
    () => console.log(`Servidor conectado al puerto: ${process.env.EXPRESS_PORT}`))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
indexRouter(app)

//CONFIG MONGOOSE
const connection = mongoose.connect(process.env.DB_URL)

//CONFIG PASSPORT
initializePassport()
app.use(passport.initialize())

//config HBS!
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))