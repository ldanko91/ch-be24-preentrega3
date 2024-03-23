export default class CurrentDto {
    constructor(userInfo) {
        this.first_name = userInfo.first_name
        this.last_name = userInfo.last_name
        this.email = userInfo.email
        this._id = userInfo._id
        this.age = userInfo.age
        this.role = userInfo.role
        this.cart = userInfo.cart
    }
}
