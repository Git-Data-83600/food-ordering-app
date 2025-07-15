const express = require('express')
const cors = require('cors')
const socketIo = require('socket.io')
const http = require('http')

const app = express()
app.use(cors())

// create server
const server = http.createServer(app)

// create socket.io instance
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

// handle socket connection
io.on('connection', (socket) => {
  console.log('New user connected')

  // handle incoming messages
  socket.on('sendMessage', (data) => {
    console.log('Message received:', data)

    // insert the message into the database (this is a placeholder, implement your DB logic here)

    // broadcast the message to all clients
    io.emit('message', data)
  })

  // handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

server.listen(4005, '0.0.0.0', () => {
  console.log('Server is running on http://localhost:4005')
})
