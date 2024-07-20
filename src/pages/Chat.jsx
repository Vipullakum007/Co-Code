import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Adjust the URL as needed

const Chat = ({ roomId }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [user, setUser] = useState('Anonymous'); // Example user

    useEffect(() => {
        socket.emit('joinRoom', { roomId });

        socket.on('newMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('newMessage');
        };
    }, [roomId]);

    const sendMessage = async () => {
        if (text.trim()) {
            const response = await fetch('http://localhost:5000/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roomId, user, text }),
            });
            const data = await response.json();
            setText('');
        }
    };

    return (
        <div className="chat-container">
            <h2>Group Chat</h2>
            <div className="chat-block">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.user}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
