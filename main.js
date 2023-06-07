const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log(`New user connected: ${socket.id}`);

  socket.on('chat message', (message) => {
    console.log(`Received message: ${message}`);
    // Broadcast the received message to all connected clients
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const port = 3001; 
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
