import usersModel from "../../models/users.js";

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
            let users = await usersModel.findById(id, { __v: 0 }).lean();
            return users
        } catch (error) {
            console.log(error)
        }

    }
    getUserByEmail = async (mail) => {
        try {
            let users = await usersModel.findOne(mail, { __v: 0 }).lean();
            return users
        } catch (error) {
            console.log(error)
        }

    }
}