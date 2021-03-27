const io = require('socket.io')(3030)

io.on('connection', socket => {
    console.log('new user')
    socket.emit('chat-message', 'Hello world')
})