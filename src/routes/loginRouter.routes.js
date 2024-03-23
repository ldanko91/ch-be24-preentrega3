import { Router } from "express";
import passport from "passport";
import { existsToken } from "../utils/jwt/jwtExistsToken.js";
import { passportCall } from "../utils/jwt/jwtPassportCall.js";
import loginController from "../controllers/login.controller.js";
import { uuid } from "uuidv4";
const LoginController = new loginController()
const loginRouter = Router();

loginRouter.get('/login', existsToken, async (req, res) => {
    return res.render('login', {
        title: `Acceso de usuarios`
    })
})

loginRouter.post('/login', async (req, res) => {
    return await LoginController.loginPost(req, res)
});

loginRouter.get('/current', passportCall('jwt'), async (req, res) => {
    return await LoginController.currentGet(req, res)
});

loginRouter.get('/register', (req, res) => {
    res.render('register', {
        title: `Formulario de registro`
    })
})

loginRouter.post('/register',
    passport.authenticate('register', {
        failureRedirect: '/users/fail-register',
    }), async (req, res) => {
        return await LoginController.registerPost(req, res)
    });

loginRouter.get('/logout', async (req, res) => {
    return await LoginController.logoutGet(req, res)
});


loginRouter.get('/fail-login', (req, res) => {
    res.json({ status: 'error', error: 'Login failed' })
})

loginRouter.get('/fail-register', (req, res) => {
    res.status(400).json({ status: 'error', error: 'Bad request' })
})

loginRouter.post('/forgot-password', async (req, res) => {
    return await LoginController.forgotPasswordPost(req, res)
})

export default loginRouter;