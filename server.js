const io = require('socket.io')(3030)

const users = {};

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('new-user', name);
    })
    socket.on('send-chat-msg', msg => {
        console.log('message: ', msg);
        socket.broadcast.emit('response-msg', { message: msg, name: users[socket.id] });
    })
})