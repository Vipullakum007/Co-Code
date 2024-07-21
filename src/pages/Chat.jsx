import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import './FeaturesPage.css';
import { LuSendHorizonal } from "react-icons/lu";
import { useAuth } from '../store/auth';

const socket = io('http://localhost:5000'); // Adjust the URL as needed

const Chat = ({ roomId }) => {
    const [messages, setMessages] = useState([]);
    const { user } = useAuth();
    const [text, setText] = useState('');
    // const [newMessages, setNewMessages] = useState({
    //     username: '',
    //     text: '',
    // });
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
        if (!user || !user.username) {
            console.error('User is not logged in or username is missing');
            return;
        }
        console.log("Sending..");
        if (text.trim()) {
            console.log("Text:", text);
            // console.log("user:", user.email);
            // const response = await fetch('http://localhost:5000/api/room/message', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ roomId, user: user.username, text }),
            // });
            // const data = await response.json();
            // console.log(data);
            // setText('');
            try {
                console.log(user);
                const response = await fetch('http://localhost:5000/api/room/message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': { token }, // Add this line
                    },
                    body: JSON.stringify({
                        roomId,
                        username: user.username,
                        text,
                    }),
                });
                const data = await response.json();
                setMessages((prevMessages) => [...prevMessages, data.message]);
                setText('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div className="feature-content">
            <div className="chat-container">
                <h2>Group Chat</h2>
                <h3>{user.username}</h3>
                <hr />
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
                        autoFocus
                    />
                    <LuSendHorizonal onClick={sendMessage} />
                    {/* <button onClick={sendMessage}>Send</button> */}
                </div>
            </div>
            <div className="editor">

                <h2>Editor</h2>
                <div className="editor-block">
                    <h3>File and Folders</h3>
                    <textarea placeholder="Write your code here..."></textarea>
                </div>
            </div>
        </div>
    );
};

export default Chat;
