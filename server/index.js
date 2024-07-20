require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const { v4: uuidv4 } = require('uuid');
const http = require('http');
const socketIo = require('socket.io');
const authRoute = require('./router/auth-router');
const roomRoute = require('./router/room-router');
const connectDB = require('./utils/db');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

const corsOptions = {
    origins: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
    credentials: true,
    optionSuccessStatus: 200,
}

// Middleware to make io accessible in controllers
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Initialize socket.io server
const server = http.createServer(app);
const io = socketIo(server, { cors: corsOptions });

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinRoom', ({ roomId }) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    socket.on('sendMessage', (message) => {
        io.to(message.roomId).emit('receiveMessage', message);
        console.log(`User ${message.senderId} sent message: ${message.content} in room: ${message.roomId}`);
    });

    

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


// APIs

app.use("/api/auth", authRoute);

app.use("/api/room", roomRoute);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}...  http://localhost:${port} `);
    })
})