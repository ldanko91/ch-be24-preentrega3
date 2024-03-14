import passport from "passport";
import * as local from "passport-local";
import jwt from "passport-jwt";
import dbUsersController from "../controllers/user.controller.js";
import { config } from "dotenv";
import createHash from "../utils/bcrypt/bryptCreateHash.js";
import useValidPassword from "../utils/bcrypt/bryptUseValidPassword.js";
import { cookieExtractor } from "../utils/jwt/cookieExtractor.js";
const DBUsersController = new dbUsersController();
config();
const privateKey = process.env.JWT_PRIVATE_KEY;
const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy

const initializePassport = () => {
  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: privateKey
  }, (jwt_payload, done) => {
    try {
      done(null, jwt_payload)
    } catch (error) {
      done(error)
    }
  }))

  passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email } = req.body
          const user = await DBUsersController.getUserByEmail({ email })
          if (user) {
            console.log('Este usuario ya se encuentra registrado previamente')
            return done(null, false)
          }

          const newUserInfo = {
            first_name,
            last_name,
            email,
            password: createHash(password),
          }

          const newUser = await DBUsersController.createOne(newUserInfo)

          return done(null, newUser)
        } catch (error) {
          return done(error)
        }
      }
    )
  )

  passport.use(
    'local-login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (username, password, done) => {
        try {
          const user = await DBUsersController.getUserByEmail({ email: username })
          if (!user) {
            console.log('Bad request')
            return done(null, false)
          }

          if (!useValidPassword(user, password)) {
            console.log('Bad request')
            done(null, false)
          }

          return done(null, user)
        } catch (error) {
          done(error)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    const user = DBUsersController.getAllUsers(id)
    done(null, user)
  })
}

export default initializePassport