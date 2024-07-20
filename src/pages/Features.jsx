import React, { useState } from 'react';
import './FeaturesPage.css';
import { LuFiles } from "react-icons/lu";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { VscRunAll } from "react-icons/vsc";
import { FcCollaboration } from "react-icons/fc";
import { IoSettingsOutline } from "react-icons/io5";
import Chat from './Chat';

const Features = () => {
    const [selectedFeature, setSelectedFeature] = useState('chat');

    const renderFeatureContent = () => {
        switch (selectedFeature) {
            case 'editor':
                return (
                    <div className="feature-content">
                        <div className="file-folder-info">
                            <h2>Files</h2>
                            <hr />
                            {/* file and folder dynamically add here */}
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
            case 'runner':
                return (
                    <div className="feature-content">
                        <div className="runner-container">

                            <h2>Runner</h2>
                            <div className="runner-block">
                                <h3>Select Language</h3>
                                <select>
                                    <option>JavaScript</option>
                                    <option>Python</option>
                                    <option>Java</option>
                                    {/* Add more languages as needed */}
                                </select>
                                <h3>Input</h3>
                                <textarea placeholder="Provide input..."></textarea>
                                <h3>Output</h3>
                                <textarea placeholder="Output will be displayed here..."></textarea>
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
            case 'chat':
                <Chat />
                break;
                // return (
                //     <div className="feature-content">
                //         <div className="chat-container">
                //             <h2>Group Chat</h2>
                //             <hr />
                //             <div className="chat-block">
                //                 {/* <h3>Chats</h3> */}
                //                 {/* Chat display component goes here */}
                //             </div>
                //         </div>

                //         <div className="editor">

                //             <h2>Editor</h2>
                //             <div className="editor-block">
                //                 <h3>File and Folders</h3>
                //                 <textarea placeholder="Write your code here..."></textarea>
                //             </div>
                //         </div>
                //     </div>
                // );
            case 'collaborators':
                return (
                    <div className="feature-content">
                        <div className="collaborator-container">

                            <h2>Collaborators</h2>
                            <hr />
                            <div className="collaborators-block">
                                {/* List of collaborators goes here */}
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
            case 'settings':
                return (
                    <div className="feature-content">
                        <div className="settings-container">

                            <h2>Settings</h2>
                            <hr />
                            <div className="settings-block">
                                {/* Font and theme settings components go here */}

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
            default:
                return null;
        }
    };

    return (
        <div className="features-page">
            <div className="sidebar">
                <ul>
                    {/* <li><LuFiles /></li>
                    <li><VscRunAll /></li>
                    <li><HiChatBubbleLeftRight /> </li>
                    <li><FcCollaboration /></li>
                    <li><IoSettingsOutline /></li> */}
                    <li onClick={() => setSelectedFeature('editor')}><LuFiles /></li>
                    <li onClick={() => setSelectedFeature('runner')}><VscRunAll /></li>
                    <li onClick={() => setSelectedFeature('chat')}><HiChatBubbleLeftRight /></li>
                    <li onClick={() => setSelectedFeature('collaborators')}><FcCollaboration /></li>
                    <li onClick={() => setSelectedFeature('settings')}><IoSettingsOutline /></li>
                </ul>
            </div>
            <div className="content">
                {renderFeatureContent()}
            </div>
        </div>
    );
};

export default Features;
