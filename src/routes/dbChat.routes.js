import { Router } from "express";
import ChatsDBManager from "../dao/dbManagers/ChatDBManager.js";

const chatRouter = Router();
const DBChatManager = new ChatsDBManager();

chatRouter.get('/', async (req, res) => {
    let download = await DBChatManager.getMessages();
    let messages = download;

    res.render('chat', {
        messages,
        title: `Chat en vivo`
    })
})

chatRouter.post('/', async (req, res) => {
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

export default chatRouter;