export const existsToken = (req, res, next) => {
    const authHeader = req.headers.cookie
    if (authHeader != null) {
        return res.redirect('/api/sessions/current')
    }

    next()

}