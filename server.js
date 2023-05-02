const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client.html');
});

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('chat message', (msg) => {
    console.log(`Message from ${socket.id}: ${msg}`);
    socket.broadcast.emit('chat message', msg);
  });
});

server.listen(3005, () => {
  console.log('Server started on port 3005');
});
