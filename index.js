const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    // chat message event
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    // fires disconnect event
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// server start
server.listen(3005, () => {
  console.log('listening on *:3005');
});