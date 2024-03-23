import usersModel from "../../models/users.js";
import cartsModel from "../../models/carts.js";

export default class UsersDBManager {
    constructor() {
        console.log('Servicio de usuarios conectado')
    }

    addUser = async (newUser) => {
        try {
            let upload = await usersModel.create(newUser);
            return upload

        } catch (error) {
            console.log(error)
        }
    }

    getUsers = async (req, res) => {
        try {
            let users = await usersModel.find({}, { __v: 0 }).lean();
            return users
        } catch (error) {
            console.log(error)
        }

    }

    getUserById = async (id) => {
        try {
            let users = await usersModel.findById(id).populate({ path: 'cart._id', model: cartsModel });
            return users
        } catch (error) {
            console.log(error)
        }

    }
    getUserByEmail = async (mail) => {
        try {
            let users = await usersModel.findOne(mail, { __v: 0 }).lean().populate({ path: 'cart._id', model: cartsModel });
            return users
        } catch (error) {
            console.log(error)
        }

    }
    updateCart = async (uId, cId) => {
        let user = await usersModel.findById(uId)
        let cart = await cartsModel.findOne({ _id: cId }).lean();
        let currentCart = user.cart
        currentCart.push(cart)
        let upload = await usersModel.updateOne({ _id: uId }, { cart: currentCart });
        return upload
    }
}