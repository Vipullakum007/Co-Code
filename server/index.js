require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const { v4: uuidv4 } = require('uuid');
const http = require('http');
const { Server } = require('socket.io');
const authRoute = require('./router/auth-router');
const roomRoute = require('./router/room-router');
const connectDB = require('./utils/db');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize socket.io server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

// const username = localStorage.getItem('username');
io.on('connection', (socket) => {
    console.log( ' a user connected' , socket.id);

    socket.on('joinRoom', ({ roomId }) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    // socket.on('sendMessage', (message) => {
    //     console.log(message);
    //     socket.to(message.roomId).broadcast('receiveMessage', message);
    //     // console.log(`User ${message.senderId} sent message: ${message.content} in room: ${message.roomId}`);
    // });

    socket.on('sendMessage', (data) => {
        console.log(data);
        io.emit('forwardMessage',data)
    });
    


    socket.on('disconnection', () => {
        console.log('user disconnected');
    });
});


// APIs

app.use("/api/auth", authRoute);

app.use("/api/room", roomRoute);

connectDB().then(() => {
    server.listen(port, () => {
        console.log(`Server running on port ${port}...  http://localhost:${port} `);
    })
})