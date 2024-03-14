import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = 'product'

const productsSchema = new mongoose.Schema({
    code:{
        type: String,
        required: true,
        unique: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    thumbnail:{
        type: Array,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
    category:{
        type: String,
        required: true
    }
})

productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;