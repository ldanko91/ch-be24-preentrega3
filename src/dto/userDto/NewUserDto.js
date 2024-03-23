import createHash from "../../utils/bcrypt/bryptCreateHash.js"

export default class NewUserDto {
    constructor(userInfo) {
        this.first_name = userInfo.first_name
        this.last_name = userInfo.last_name
        this.email = userInfo.email
        this.password = createHash(userInfo.password)
    }
}
