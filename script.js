const socket = io('http://localhost:3030');

const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

document.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('send-chat-msg', message);
    messageInput.value = '';
})

socket.on('chat-message', data => {
    console.log(data)
})

socket.on('response-msg', message => {
    const newMessage = document.createElement('div');
    newMessage.innerHTML = `Your Message: ${message}`;
    messageContainer.appendChild(newMessage);
})