const mongoose = require('mongoose');

// const MessageSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     text: { type: String, required: true },
//     timestamp: { type: Date, default: Date.now },
// });

const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    roomId: { type: String, required: true, unique: true },
    messages:[ {
        username: { type: String, required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
    }],
});

// const messageModel = mongoose.model('Message', MessageSchema);
const Room = mongoose.model('Room', RoomSchema);

module.exports = Room ;
