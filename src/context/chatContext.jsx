// import React, { createContext, useContext, useState, useCallback } from 'react';
// import { ChatContextType, ChatMessage } from "../types/chatTypes";

// const ChatContext = createContext<ChatContextType | undefined>(undefined);

// // Custom hook to use the ChatContext
// export const useChat = () => {
//     const context = useContext(ChatContext);
//     if (context === undefined) {
//         throw new Error("useChat must be used within a ChatProvider");
//     }
//     return context;
// };

// // Provider component to manage chat state
// export const ChatProvider = ({ children }) => {
//     const [messages, setMessages] = useState([]);

//     const addMessage = useCallback((message) => {
//         setMessages((prevMessages) => [...prevMessages, message]);
//     }, []);

//     const clearMessages = useCallback(() => {
//         setMessages([]);
//     }, []);

//     return (
//         <ChatContext.Provider value={{ messages, addMessage, clearMessages }}>
//             {children}
//         </ChatContext.Provider>
//     );
// };
