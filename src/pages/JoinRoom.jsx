// JoinRoom.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JoinRoom.css';
import heroImg from '../assets/hero.png';
const JoinRoom = ({ image, heading }) => {
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const generateRandomRoomId = () => {
        const characters = '-ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz-0123456789-';
        let result = '';
        const length = 30; // You can change the length of the room ID as needed
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    };

    const generateRoomId = (e) => {
        e.preventDefault();
        const newRoomId = generateRandomRoomId();
        setRoomId(newRoomId);
    };

    const handleJoin = async () => {
        navigate('/features', { state: { roomId, username } });
    };

    return (
        <div className="section-auth">
            <div className="container grid grid-two-cols">
                <div className="section-auth-image" >

                    <img src={heroImg} alt="Join Room" width={400} height={400} />
                </div >
                <div className="auth-form">
                    <h1 className="main-heading mb-3">Join a Room</h1>
                    <input
                        type="text"
                        placeholder="Join Room ID"
                        value={roomId}
                        // value="wKyOTE12pb02WGoiKyj69Pyu4muYaw"
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <a href="#!" onClick={generateRoomId} >Generate Room ID</a>
                    <button onClick={handleJoin} className="section-auth-button">Join</button>
                </div>
            </div>
        </div >
    );
};

export default JoinRoom;
