const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/clientNew.html');
});

io.on('connection', (socket) => {
  console.log(`New user connected: ${socket.id}`);

  // socket.on('join room', (room) => {
  //   socket.join(room);
  //   console.log(`${socket.id} joined room ${room}`);
  // });

  socket.on('chat message', (data) => {
    console.log(`Message from ${socket.id}: ${data.message} (to ${data.to})`);
    if (data.to) {
      socket.to(data.to).emit('chat message', data.message);
    } else {
      socket.broadcast.emit('chat message', data.message);
    }
  });
});

server.listen(3005, () => {
  console.log('Server started on port 3005');
});
