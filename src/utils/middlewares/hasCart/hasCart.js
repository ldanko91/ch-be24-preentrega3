import dbUsersController from "../../../controllers/user.controller.js";
import dbCartsController from "../../../controllers/carts.controller.js";
const UserManager = new dbUsersController()
const CartManager = new dbCartsController()

const hasCart = async (email) => {
    let user = await UserManager.getUserByEmail(email);
    if (user.cart.length < 1) {
        let currentCart = await CartManager.createOne();
        let upload = await UserManager.updateCart(user._id, currentCart._id)
        return currentCart
    }
    let currentCart = user.cart[0]
    return currentCart

}

export default hasCart