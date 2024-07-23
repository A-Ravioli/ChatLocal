// src/App.tsx
import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import ChatHistory from "./components/ChatHistory";
import ChatInterface from "./components/ChatInterface";
import ModelSelector from "./components/ModelSelector";
import "./App.css";

const App: React.FC = () => {
  const [chats, setChats] = useState<{ id: string; name: string }[]>([]);
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [model, setModel] = useState<string>("gpt2");

  useEffect(() => {
    // Load chats from backend
    invoke("get_chats").then((loadedChats) =>
      setChats(loadedChats as { id: string; name: string }[])
    );
  }, []);

  const handleNewChat = () => {
    invoke("create_chat").then((newChat) => {
      setChats([...chats, newChat as { id: string; name: string }]);
      setCurrentChat((newChat as { id: string }).id);
    });
  };

  return (
    <div className="app">
      <div className="sidebar">
        <ModelSelector model={model} setModel={setModel} />
        <ChatHistory
          chats={chats}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
        />
        <button onClick={handleNewChat}>New Chat</button>
      </div>
      <ChatInterface chatId={currentChat} model={model} />
    </div>
  );
};

export default App;
