const Room = require('../models/room-model');

const createRoom = async (req, res) => {
    const { name, roomId } = req.body;
    try {
        let room = await Room.findOne({ roomId });
        if (room) {
            console.log("Room already exists");
            return res.status(400).json({ message: "Room  already exists" });
        }
        room = new Room({ name, roomId });
        await room.save();
        res.json({ room });

    } catch (error) {
        return res.status(500).json({ message: "creatRoom error : " + error.message });
    }
};

const sendMessage = async (req, res) => {
    const { roomId, username, text } = req.body;
    try {
        const newMessage = {
            username: username,
            text: text,
            timestamp: new Date(),
        };

        const room = await Room.findOneAndUpdate(
            { roomId },
            { $push: { messages: newMessage } },
            { new: true }
        );
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.json({ room: room, msg: newMessage });
    } catch (error) {
        res.status(500).json({ message: "sendMessage error : " + error.message });
    }
};

const getMessages = async (req, res) => {
    const { roomId } = req.params;
    try {
        const room = await Room.findOne({ roomId: roomId });
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(201).json({ messages: room.messages });
        // res.json(room.messages);
    } catch (error) {
        res.status(500).json({ message: "getMessage error : " + error.message });
    }
};

module.exports = { createRoom, sendMessage, getMessages };