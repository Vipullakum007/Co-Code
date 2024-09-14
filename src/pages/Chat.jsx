import React, { useEffect, useState } from 'react';
import './FeaturesPage.css';
import { LuSendHorizonal } from "react-icons/lu";
import { useAuth } from '../store/auth';
import { useSocket } from '../context/SocketProvider'; // Use the socket from context

const Chat = ({ roomId }) => {
    const { user } = useAuth();
    const { socket, joinRoom } = useSocket();
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

    const [hasJoinedRoom, setHasJoinedRoom] = useState(false); 

    useEffect(() => {
        if (!socket || !roomId) return;

        const username = localStorage.getItem('username'); // Adjust according to your actual source of username

        if (!hasJoinedRoom) {
            joinRoom(roomId);
            console.log(hasJoinedRoom);
            setHasJoinedRoom(true); 
            console.log(hasJoinedRoom);
            socket.emit('joinRoom', { username, roomId });
        }

        socket.on('receiveMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [roomId, socket, joinRoom, hasJoinedRoom]);

    const sendMessage = () => {
        const username = localStorage.getItem('username');
        const message = { username, text, roomId };
        socket.emit('sendMessage', message);
        setText('');
    };

    return (
        <div className="chat-container">
            <h2>Group Chat</h2>
            {/* <h3>{user.username}</h3>                                 */}
            <hr />
            <div className="chat-block">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.username}</strong>: {msg.text}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your message..."
                    autoFocus
                />
                <LuSendHorizonal onClick={sendMessage} />
            </div>
        </div>
    );
};

export default Chat;
