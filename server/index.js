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
// io.on('connection', (socket) => {
//     console.log( ' a user connected' , socket.id);

//     socket.on('joinRoom', ({ roomId }) => {
//         socket.join(roomId);
//         console.log(`User joined room: ${roomId}`);
//     });
//     socket.on('leaveRoom', ({ roomId }) => {
//         socket.leave(roomId);
//         console.log(`User left room: ${roomId}`);
//     });
//     socket.on('sendMessage', ({ username, text, roomId }) => {
//         console.log(username,text);
//         io.to(roomId).emit('receiveMessage',{username, text});
//     });

//     socket.on('disconnection', () => {
//         console.log('user disconnected');
//     });
// });

// = = = = = version 2
const rooms = {}; // Object to store roomId => array of collaborators

io.on('connection', (socket) => {
    console.log('Connection established', socket.id);

    // Handle user joining a room
    socket.on('joinRoom', ({ username, roomId }) => {
        console.log(username, 'joined', roomId);

        socket.username = username;  // Store username in the socket
        socket.roomId = roomId;      // Store roomId in the socket
        socket.join(roomId);

        if (!rooms[roomId]) {
            rooms[roomId] = []; // Create room if it doesn't exist
        }

        const roomCollaborators = rooms[roomId];

        if (!roomCollaborators.includes(username)) {
            roomCollaborators.push(username);
        }

        console.log('collaborators updating:', roomCollaborators);
        io.in(roomId).emit('collaboratorsUpdate', roomCollaborators);
    });

    // Handle user leaving a room
    socket.on('leaveRoom', ({ username, roomId }) => {
        socket.leave(roomId);

        if (rooms[roomId]) {
            rooms[roomId] = rooms[roomId].filter(user => user !== username);
            io.in(roomId).emit('collaboratorsUpdate', rooms[roomId]);
        }
    });

    // Handle sending messages
    socket.on('sendMessage', ({ username, text, roomId }) => {
        console.log(username, text);
        io.to(roomId).emit('receiveMessage', { username, text });
    });

    // Handle user disconnecting
    socket.on('disconnect', () => {
        const { username, roomId } = socket;

        if (roomId && rooms[roomId]) {
            rooms[roomId] = rooms[roomId].filter(user => user !== username);
            io.in(roomId).emit('collaboratorsUpdate', rooms[roomId]);
        }
    });
});


// = = = = = version 3

//const rooms = new Map();
/*
io.on('connection', (socket) => {
    console.log('Connection established', socket.id);

    socket.on('joinRoom', ({ username, roomId }) => {
        console.log(username, "joined ", roomId);
        socket.username = username;  // Store the username on the socket
        socket.roomId = roomId;      // Optionally store the roomId too
        socket.join(roomId);

        if (!rooms.has(roomId)) {
            rooms.set(roomId, []);
        }

        const roomCollaborators = rooms.get(roomId);

        if (!roomCollaborators.includes(username)) {
            roomCollaborators.push(username);
        }
        console.log('collaborators updating: ', roomCollaborators);
        io.in(roomId).emit('collaboratorsUpdate', roomCollaborators);
    });

    socket.on('leaveRoom', ({ username, roomId }) => {
        socket.leave(roomId);

        const roomCollaborators = rooms.get(roomId);

        if (roomCollaborators) {
            rooms.set(roomId, roomCollaborators.filter((user) => user !== username));

            io.in(roomId).emit('collaboratorsUpdate', rooms.get(roomId));
        }
    });

    socket.on('sendMessage', ({ username, text, roomId }) => {
        console.log(username, text);
        io.to(roomId).emit('receiveMessage', { username, text });
    });

    socket.on('disconnect', () => {
        const { username, roomId } = socket;

        if (roomId && username) {
            const roomCollaborators = rooms.get(roomId);

            if (roomCollaborators) {
                const updatedCollaborators = roomCollaborators.filter((user) => user !== username);
                rooms.set(roomId, updatedCollaborators);

                io.in(roomId).emit('collaboratorsUpdate', updatedCollaborators);
            }
        }
    });
});
*/


// APIs

app.use("/api/auth", authRoute);

app.use("/api/room", roomRoute);

connectDB().then(() => {
    server.listen(port, () => {
        console.log(`Server running on port ${port}...  http://localhost:${port} `);
    })
})