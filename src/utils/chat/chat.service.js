import ChatsDBManager from "../../dao/dbManagers/ChatDBManager";
const DBChatManager = new ChatsDBManager();
const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado");

    const emitOldMessages = () => {
        const messages = DBChatManager.getMessages();
        socket.emit('message-showOldMessages', messages);
    };

    // Emitir mensajes antiguos cuando un nuevo cliente se conecta
    emitOldMessages();

    socket.on('sendMessage', data => {
        console.log(data);
        console.log("Mensaje enviado");

        // Agregar el nuevo mensaje
        DBChatManager.addMessage(data);

        // Emitir mensajes antiguos después de agregar el nuevo mensaje
        emitOldMessages();
    });
});