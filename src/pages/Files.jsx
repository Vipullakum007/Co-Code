import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Editor from './Editor';

const Files = ({ onFileUpload }) => {
    const [fileList, setFileList] = useState([]);
    const [editorContent, setEditorContent] = useState('');

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newFileList = files.map(file => ({
            name: file.name,
            content: ''
        }));

        // Read the content of the files
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                setFileList(prevList =>
                    prevList.map(f => f.name === file.name ? { ...f, content: fileContent } : f)
                );
                onFileUpload(fileContent);
                setEditorContent(fileContent); // add content to editor
            };
            reader.readAsText(file);
        });


    };

    return (
        <div className='file-folder-info'>
            <h2>Files</h2>
            <hr />
            <div className="file-folder-block">

                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                />
                <ul>
                    {fileList.map(file => (
                        <li key={file.name}>{file.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

Files.propTypes = {
    onFileUpload: PropTypes.func.isRequired,
};

export default Files;
