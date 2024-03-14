import bcrypt from 'bcrypt'

const useValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

export default useValidPassword