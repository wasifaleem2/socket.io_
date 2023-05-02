const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let clients = [];
io.on('connection', (socket) => {
    console.log('a user connected');
    // Generate a unique ID for the client
    const clientId = socket.id;

    // Store the client ID for future use
    // (you could use a database or an in-memory store for this)
    clients[clientId] = socket;
    console.log("clients", clients[clientId].id);

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