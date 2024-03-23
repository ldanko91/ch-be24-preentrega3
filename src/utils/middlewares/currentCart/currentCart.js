const CurrentCart = () => {
    return (req, res, next) => {
        let cartCode = req.user.user.cartCode
        return cartCode, next()
    }
}

export default CurrentCart