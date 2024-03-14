import passport from "passport";

export const passportCall = strategy => {
    return (req, res, next) => {
        passport.authenticate(strategy, function (error, user, info) {
            if (error) return next(error)

            if (!user)
                return res.status(401).json({
                    status: 'error',
                    error: info.messages ? info.messages : info.toString(),
                })
            req.user = user
            next()
        })(req, res, next)
    }
}