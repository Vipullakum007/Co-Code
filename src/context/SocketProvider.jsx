import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [currentRoomId, setCurrentRoomId] = useState(null);
    const username = localStorage.getItem('username');

    useEffect(() => {
        console.log('Initializing socket connection...');
        const newSocket = io('http://localhost:5000', {
            transports: ['websocket', 'polling'],
        });

        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id);
        });

        newSocket.on('disconnect', (reason) => {
            console.warn('Socket disconnected:', reason);
            if (reason === 'io server disconnect') {
                newSocket.connect(); 
            }
        });

        newSocket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        setSocket(newSocket);

        return () => {
            console.log('Closing socket connection...');
            newSocket.disconnect(); 
        };
    }, []);

    useEffect(() => {
        if (socket && currentRoomId && username) {
            console.log(`Joining room: ${currentRoomId}`);
            socket.emit('joinRoom', { username, roomId: currentRoomId });

            socket.on('joinedRoom', (data) => {
                console.log(`Successfully joined room: ${data.roomId}`);
            });

            return () => {
                console.log(`Leaving room: ${currentRoomId}`);
                socket.emit('leaveRoom', { roomId: currentRoomId });
                socket.off('joinedRoom');
            };
        }
    }, [socket, currentRoomId, username]);

    const joinRoom = useCallback((roomId) => {
        if (roomId !== currentRoomId) { 
            console.log(`Switching to room: ${roomId}`);
            setCurrentRoomId(roomId);
        }
    }, [currentRoomId]);

    return (
        <SocketContext.Provider value={{ socket, currentRoomId, joinRoom }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};
