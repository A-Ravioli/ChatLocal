// src/components/ChatInterface.tsx
import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  chatId: string | null;
  model: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ chatId, model }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (chatId) {
      // Load messages for the current chat
      invoke("get_messages", { chatId }).then((loadedMessages) =>
        setMessages(loadedMessages as Message[])
      );
    }
  }, [chatId]);

  const handleSend = async () => {
    if (!input.trim() || !chatId) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    // Send message to backend and get AI response
    const response = await invoke("send_message", {
      chatId,
      message: input,
      model,
    });
    const aiMessage: Message = {
      role: "assistant",
      content: response as string,
    };
    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    <div className="chat-interface">
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
