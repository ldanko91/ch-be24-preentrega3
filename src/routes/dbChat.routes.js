import { Router } from "express";
import ChatsDBManager from "../dao/dbManagers/ChatDBManager.js";

const dbChatRouter = Router();
const DBChatManager = new ChatsDBManager();

dbChatRouter.get('/', async (req, res) => {
    let download = await DBChatManager.getMessages();
    let messages = download;
    console.log(messages);
    // let productos = carritos.product.products;
    // console.log(productos);
    res.render('chat', {
        messages,
        title: `Chat en vivo`
    })
})

dbChatRouter.post('/', async (req, res) => {
    const user = req.body.user
    const message = req.body.message
    const newMessage = {
        user: user,
        message: message
    };
    console.log(message)
    const upload = await DBChatManager.addMessage(newMessage);
    res.send({ status: "success", payload: upload })
})

export default dbChatRouter;