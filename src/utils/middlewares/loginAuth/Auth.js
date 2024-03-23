const Auth = (role) => {
    return (req, res, next) => {
        if (!req.user.user)
            return res.status(401).json({ status: 'error', error: 'Unauthorized' })

        if (req.user.user.role != role)
            return res.status(403).json({ status: 'error', error: 'Forbiden' })

        next()
    }
}

export default Auth