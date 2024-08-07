import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './FeaturesPage.css';
import { LuSendHorizonal } from "react-icons/lu";
import { useAuth } from '../store/auth';
import Editor from './Editor';

const socket = io('http://localhost:5000');

const Chat = ({ roomId }) => {

    const { user } = useAuth();
    const [text, setText] = useState('');
    // const [messageReceived, setMessageReceived] = useState("");
    // socket.on("receiveMessage", (data) => {
    //     setMessageReceived(data.message);
    // })

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('receiveMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const sendMessage = () => {
        const username = localStorage.getItem('username');
        const message = { username: username, text: text };

        socket.emit('sendMessage', message);
        setText('');
    };
    // const sendMessage =  () => {

    //     const username = localStorage.getItem('username');

    //     socket.emit('sendMessage', { username: username, text: text });


    // };
    socket.on('forwardMessage', (data) => {
        socket.disconnect();
        console.log(data)
    })
    return (
        <div className="feature-content">
            <div className="chat-container">
                <h2>Group Chat</h2>
                <h3>{user.username}</h3>
                <hr />
                <div className="chat-block">
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.username}</strong>: {msg.text}
                        </div>
                    ))}
                    {/* {messages.map((msg, index) => ( */}
                    {/* <div key={index}> */}
                    {/* <strong>{messages.username}</strong> {messages.text} */}
                    {/* {messageReceived} */}
                    {/* </div> */}
                    {/* ))} */}
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

                <Editor />
            </div>
        </div>
    );
};

export default Chat;
