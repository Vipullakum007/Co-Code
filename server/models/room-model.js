const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    roomId: { type: String, required: true ,unique: true },
    messages: [MessageSchema],
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
