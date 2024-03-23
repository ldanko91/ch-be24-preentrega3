import mongoose from "mongoose";
import { uuid } from "uuidv4";

const cartsCollection = 'cart'

const cartsSchema = new mongoose.Schema({
    
    products:{
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'product'
            },
                id: {
                type: String,
                    required: true,
            },
                quantity: {
                    type: Number,
                required: true,
                default: 1

                },
            },
        ],
        default:[],
        required: true
    },
    code: {
        type: String,
        default: uuid(),
        required: true
    },
})

const cartsModel = mongoose.model(cartsCollection, cartsSchema)

export default cartsModel;