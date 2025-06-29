import { useState } from "react";
import ChatButton from "./chatbot-body/ChatButton";
import ChatWindow from "./chatbot-body/ChatWindow";
// 寵物電商聊天流程配置

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem", // 相當於 Tailwind 的 bottom-4
        right: "1rem", // 相當於 right-4
        zIndex: 888, // 相當於 z-50
      }}
    >
      <ChatButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <ChatWindow isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ChatBot;
