import { Router } from "express";
import dbUsersController from "../controllers/user.controller.js";
import passport from "passport";
import { generateToken } from "../utils/jwt/jwtGenerateToken.js";
import useValidPassword from "../utils/bcrypt/bryptUseValidPassword.js";
import { existsToken } from "../utils/jwt/jwtExistsToken.js";
import { passportCall } from "../utils/jwt/jwtPassportCall.js";
const loginRouter = Router();

const DBUsersController = new dbUsersController();

loginRouter.get('/login', existsToken, (req, res) => {
        return res.render('login', {
            title: `Acceso de usuarios`
        })
})

loginRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password)
            return res.status(400).json({ status: 'error', error: 'Este Bad Request' });

        const user = await DBUsersController.getUserByEmail(email);
        if (!user)
            return res.status(400).json({ status: 'error', message: 'Bad Request' });
        if (!useValidPassword(user, password))
            return res.status(400).json({ status: 'error', message: 'Bad Request' });

        const token = generateToken({ id: user._id, role: user.role });

        res.cookie('authToken', token, {
            httpOnly: true,
        }).redirect('/api/sessions/current');

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
});

loginRouter.get('/current', passportCall('jwt'), async (req, res) => {
    try {
        if (req.user.user.role === 'admin') {
            let users = await DBUsersController.getAllUsers();
            return res.render('adminSection', {
                users,
                title: `Listado de usuarios`
            });
        }

        const userId = req.user.user.id;
        let user = await DBUsersController.getUserById(userId);
        res.render('userProfile', {
            user,
            title: `Perfil de ${user.first_name} ${user.last_name}`
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

loginRouter.get('/register', (req, res) => {
    res.render('register', {
        title: `Formulario de registro`
    })
})

loginRouter.post('/register', passport.authenticate('register', {
    failureRedirect: '/users/fail-register',
}),
    async (req, res) => {
    try {
        res
            .status(201)
            .json({ status: 'Success', message: 'User has been register' })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal Server Error' })
    }
    }
)

loginRouter.get('/logout', (req, res) => {
    res.clearCookie('authToken')
    return res.redirect('/api/sessions/login');
});


loginRouter.get('/fail-login', (req, res) => {
    res.json({ status: 'error', error: 'Login failed' })
})

loginRouter.get('/fail-register', (req, res) => {
    res.status(400).json({ status: 'error', error: 'Bad request' })
})

loginRouter.post('/forgot-password', async (req, res) => {
    try {
        const { email, password } = req.body
        const passwordEncrypted = createHash(password)
        await DBUsersController.updateUserByEmail({ email }, { password: passwordEncrypted })
        res.status(200).json({ status: 'Success', message: 'Password updated' })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal Server Error' })
    }
})


export default loginRouter;