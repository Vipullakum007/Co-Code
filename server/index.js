require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const { v4: uuidv4 } = require('uuid');
// const http = require('http');
const authRoute = require('./router/auth-router');
const roomRoute = require('./router/room-router');
const connectDB = require('./utils/db');

const app = express();
const port = 5000;

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000", // Replace with your frontend URL
//         methods: ["GET", "POST"]
//     }
// });

// Middleware
app.use(cors());
app.use(express.json());

const corsOptions = {
    origins: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE','HEAD'],
    credentials: true,
    optionSuccessStatus: 200,
}

app.use("/api/auth", authRoute);

app.use("/api/room", roomRoute);

/*
// Socket.IO connection
io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('join-room', ({ roomId, username }) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-joined', { username });
        console.log(`${username} joined room: ${roomId}`);
    });

    socket.on('send-message', ({ roomId, message, username }) => {
        io.in(roomId).emit('receive-message', { username, message });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
    });
});
*/

connectDB().then(()=>{
    app.listen(port , ()=> {
        console.log(`Server running on port ${port}...  http://localhost:${port} `);
    })
})