import React, { useState } from 'react';
import './FeaturesPage.css';
import { LuFiles } from "react-icons/lu";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { VscRunAll } from "react-icons/vsc";
import { FcCollaboration } from "react-icons/fc";
import { IoSettingsOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import Chat from './Chat';
import Editor from './Editor';
import Files from './Files';
import Runner from './Runner';
import Collaborators from './Collaborators';
import Settings from './Settings';

const Features = () => {
    const [selectedFeature, setSelectedFeature] = useState('chat');
    const [editorContent, setEditorContent] = useState('');

    const handleFileUpload = (fileContent) => {
        setEditorContent(fileContent);  // Updates the editor content when files are uploaded
    };

    const location = useLocation(); 
    const { roomId } = location.state || {};

    // Function to render feature content based on selection
    const renderFeatureContent = () => {
        switch (selectedFeature) {
            case 'editor':
                return <Files onFileUpload={handleFileUpload} />;
            case 'runner':
                return <Runner />;
            case 'chat':
                return <Chat roomId={roomId} />;
            case 'collaborators':
                return <Collaborators />;
            case 'settings':
                return <Settings />;
            default:
                return null;
        }
    };

    return (
        <div className="features-page">
            {/* Left Sidebar */}
            <div className="sidebar">
                <ul>
                    <li onClick={() => setSelectedFeature('editor')}><LuFiles /></li>
                    <li onClick={() => setSelectedFeature('runner')}><VscRunAll /></li>
                    <li onClick={() => setSelectedFeature('chat')}><HiChatBubbleLeftRight /></li>
                    <li onClick={() => setSelectedFeature('collaborators')}><FcCollaboration /></li>
                    <li onClick={() => setSelectedFeature('settings')}><IoSettingsOutline /></li>
                </ul>
            </div>

            {/* Right Content Area */}
            <div className="content">
                <div className="feature-content">
                    {/* Left-side feature content (files, runner, chat, etc.) */}
                    <div className="feature-details">
                        {renderFeatureContent()}
                    </div>

                    {/* Right-side editor (common for all features) */}
                    <div className="editor">
                        <Editor value={editorContent} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
