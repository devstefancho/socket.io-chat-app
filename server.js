const io = require('socket.io')(3030)

io.on('connection', socket => {
    console.log('new user')
    socket.emit('chat-message', 'Hello world')

    socket.on('send-chat-msg', msg => {
        console.log('message: ', msg);
        socket.emit('response-msg', msg);
    })
})