// import React, { useContext, useState } from 'react';
// import { ChatContext } from '../context/chatContext';
// import { useAuth } from '../store/auth';

// const Chat = () => {
//     const { messages, sendMessage } = useContext(ChatContext);
//     const { user } = useAuth();
//     const [text, setText] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         sendMessage(text);
//         setText('');
//     };

//     return (
//         <div className="feature-content">
//             <div className="chat-container">
//                 <h2>Group Chat</h2>
//                 <hr />
//                 <div className="chat-block">
//                     {messages.map((message, index) => (
//                         <div key={index}>
//                             <strong>{message.user}:</strong> {message.text}
//                         </div>
//                     ))}
//                 </div>
//                 {user ? (
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             value={text}
//                             onChange={(e) => setText(e.target.value)}
//                             placeholder="Type a message..."
//                         />
//                         <button type="submit">Send</button>
//                     </form>
//                 ) : (
//                     <p>Please log in to join the chat.</p>
//                 )}
//             </div>
//             <div className="editor">
//                 <h2>Editor</h2>
//                 <div className="editor-block">
//                     <h3>File and Folders</h3>
//                     <textarea placeholder="Write your code here..."></textarea>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Chat;
