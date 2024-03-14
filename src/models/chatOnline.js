import mongoose from "mongoose";

const messagesCollection = 'message'

const messagesSchema = new mongoose.Schema({

    user: {
        type: String,
        ref: 'user',
        required: true,
    },
    message: {
        type: String,
        required: true,
        default: ""

    },

})

const chatModel = mongoose.model(messagesCollection, messagesSchema)

export default chatModel;