interface ChatMessage {
    username: string;
    text: string;
    timestamp: Date;
}

interface ChatContextType {
    messages: ChatMessage[];
    addMessage: (message: ChatMessage) => void;
    clearMessages: () => void;
}

export {ChatMessage , ChatContextType}