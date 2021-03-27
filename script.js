const socket = io('http://localhost:3030');

const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');
const myStyle = {
    backgroundColor: '#212121',
    color: '#fff'
};
const newUserStyle = {
    backgroundColor: 'grey',
    color: '#fff',
    textAlign: 'center',
    padding: '1rem'
};

const appendMessage = (message, name, self = false) => {
    const newMessage = document.createElement('div');
    newMessage.innerHTML = `${name}: ${message}`;
    if(self) {
        Object.assign(newMessage.style, myStyle);
    }
    messageContainer.appendChild(newMessage);
}

const name = prompt('Enter your name');
socket.emit('new-user', name);

document.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('send-chat-msg', message);
    messageInput.value = '';

    appendMessage(message, name, true); // display my message
})

socket.on('response-msg', ({ message, name }) => {
    appendMessage(message, name); // display others message
})

socket.on('new-user', name => {
    const newMessage = document.createElement('div');
    newMessage.innerHTML = `${name} joined`;
    Object.assign(newMessage.style, newUserStyle);
    messageContainer.appendChild(newMessage);
})