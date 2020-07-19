//node server to hande\le socket io connectiin
const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket => {
    //If any new user joins let other users connected to the server know
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    //If someone sends a message then broadcast to everyone
    socket.on('send', message => {
        socket.broadcast.emit('recieve', { message: message, name: users[socket.id] });
    });

    //If someone leaves the chat let others know
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});