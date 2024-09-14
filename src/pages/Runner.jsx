import React from 'react';

const Runner = () => {
    return (
        <div className='runner-container'>
            <h2>Runner</h2>
            <hr />
            <div className="runner-block">
                <h3>Select Language</h3>
                <select>
                    <option>JavaScript</option>
                    <option>Python</option>
                    <option>Java</option>
                </select>
                <h3>Input</h3>
                <textarea placeholder="Provide input..."></textarea>
                <h3>Output</h3>
                <textarea placeholder="Output will be displayed here..."></textarea>
            </div>
        </div>
    );
};

export default Runner;
