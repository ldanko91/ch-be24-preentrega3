import bcrypt from 'bcrypt'

const createHash = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

export default createHash