import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import './FeaturesPage.css';
import { LuSendHorizonal } from "react-icons/lu";
import { useAuth } from '../store/auth';

const socket = io('http://localhost:5000');

const Chat = ({ roomId }) => {
    const [messages, setMessages] = useState({
        username: '',
        text: ''
    });
    const { user } = useAuth();
    const [text, setText] = useState('');
    const [messageReceived, setMessageReceived] = useState("");
    socket.on("receiveMessage", (data) => {
        setMessageReceived(data.message);
    })



    const sendMessage =  () => {

        const username = localStorage.getItem('username');


        // if (text.trim()) {
        //     console.log("Text:", text);
        //     try {
        //         console.log(user);
        //         const response = await fetch('http://localhost:5000/api/room/message', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({
        //                 roomId: roomId,
        //                 username: user.username,
        //                 text: text,
        //             }),
        //         });
        //         const data = await response.json();
        //         console.log(data);
        //         setMessages(data.msg);
        //         setText('');
        //     } catch (error) {
        //         console.error('Error sending message:', error);
        //     }

        // }
        socket.emit('sendMessage', { username: username, text: text });
        

    };
    socket.on('forwardMessage',(data)=> {  
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
                    {/* {messages.map((msg, index) => ( */}
                    {/* <div key={index}> */}
                    {/* <strong>{messages.username}</strong> {messages.text} */}
                    {messageReceived}
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
