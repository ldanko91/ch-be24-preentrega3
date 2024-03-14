export const authToken = (req, res, next) => {
    const authHeader = req.headers.cookie
    if (authHeader = null)
        return res.status(401).json({ status: 'error', error: 'Unauthorized' })

    const token = authHeader.split('=')[1]
    console.log(authHeader)
    console.log(`Este otro`, token)

    jwt.verify(token, secret, (error, credentials) => {
        console.log(error)
        if (error)
            return res.status(401).json({ status: 'error', error: 'Unauthorized' })

        req.user = credentials.user

        next()
    })
}