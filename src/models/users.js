import mongoose from "mongoose";

const usersCollection = 'user'

const usersSchema = new mongoose.Schema({

    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    cart: {
        type: [
            {
                cart: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'cart'
                },
                id: {
                    type: String,
                    required: true,
                },
            },
        ],
        default: [],
        required: true
    },

})

const usersModel = mongoose.model(usersCollection, usersSchema)

export default usersModel;