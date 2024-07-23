// src/components/ModelSelector.tsx
import React from "react";
import { invoke } from "@tauri-apps/api";

interface ModelSelectorProps {
  model: string;
  setModel: (model: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ model, setModel }) => {
  const handleModelChange = async (newModel: string) => {
    // Check if the model is downloaded, if not, download it
    const isDownloaded = await invoke("is_model_downloaded", {
      model: newModel,
    });
    if (!isDownloaded) {
      await invoke("download_model", { model: newModel });
    }
    setModel(newModel);
  };

  return (
    <select value={model} onChange={(e) => handleModelChange(e.target.value)}>
      <option value="gpt2">GPT-2</option>
      <option value="gpt-j-6B">GPT-J 6B</option>
      <option value="llama2">LLaMA 2</option>
    </select>
  );
};

export default ModelSelector;
