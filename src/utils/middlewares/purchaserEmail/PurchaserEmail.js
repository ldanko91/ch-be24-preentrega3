import dbUsersController from "../../../controllers/user.controller.js"
const UsersController = new dbUsersController();

const PurchaserEmail = async (userId) => {
    let user = await UsersController.getUserById(userId)
    let email = user.email
    return email
}

export default PurchaserEmail