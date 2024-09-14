import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketProvider'; // Assuming you are using the context for the socket

const Collaborators = ({ roomId }) => {
    const { socket } = useSocket(); // Get socket from context
    const [collaborators, setCollaborators] = useState([]);

    useEffect(() => {
        socket.on('collaboratorsUpdate', (updatedCollaborators) => {
            console.log('collaborators Updated : ' + updatedCollaborators);
            setCollaborators(updatedCollaborators);
        });

        // return () => {
        //     socket.off('collaboratorsUpdate');
        // };
    }, [socket, roomId]);

    return (
        <div className="collaborator-container">
            <h2>Collaborators</h2>
            <hr />
            <div className="collaborators-block">
                
                {collaborators.length > 0 ? (
                    collaborators.map((collaborator, index) => (
                        <div key={index}>{collaborator}</div>
                    ))
                ) : (
                    <p>No collaborators in this room</p>
                )}
            </div>
        </div>
    );
};

export default Collaborators;
