const socket = io();

const oldMessagesDiv = document.getElementById("oldMessagesDiv")
const sendMessge = document.getElementById("sendMessage")
sendMessge.addEventListener('click', e => {
    const userMail = document.getElementById("userMail")
    const message = document.getElementById("message")
    const newMessage = {
        user: userMail.value,
        message: message.value
    }
    socket.emit('sendMessage', newMessage)
})

socket.on('message-showOldMessages', messages => {
    let messagesShow = ""
    console.table(messages)
    if (messages && Array.isArray(messages)) {
        messages.forEach(message => {
            messagesShow += `<li><h3>${this.message.user} dice: ${this.message.message}<h3/><br/><li/>`
        })
        oldMessagesDiv.innerHTML = messagesShow;
    }
})

// const chatForm = document.getElementById("chatForm")
// const userMail = document.getElementById("userMail")
// const message = document.getElementById("message")

// chatForm.addEventListener('submit', e => {
//     e.preventDefault();
//     let newMessage = {
//         user: userMail.value,
//         message: message.value,
//     }
//     socket.emit('sendMessage', newMessage)
// })