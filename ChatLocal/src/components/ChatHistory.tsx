import React from "react";

interface ChatHistoryProps {
  chats: { id: string; name: string }[];
  currentChat: string | null;
  setCurrentChat: (id: string) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  chats,
  currentChat,
  setCurrentChat,
}) => {
  return (
    <div className="chat-history">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`chat-item ${chat.id === currentChat ? "active" : ""}`}
          onClick={() => setCurrentChat(chat.id)}
        >
          {chat.name}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
