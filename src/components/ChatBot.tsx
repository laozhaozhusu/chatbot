import React from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useChatBot } from "./useChatBot";
import type { ChatBotProps } from "./types";
import "../ChatBot.css";

/**
 * ChatBot 主组件
 * 职责：组合各个子组件，协调它们之间的交互
 *
 * 设计模式：
 * - 高内聚：每个子组件负责自己的展示和交互逻辑
 * - 低耦合：通过props传递数据和回调，组件之间无直接依赖
 * - 单一职责：主组件只负责组装和状态管理
 */
const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  const {
    messages,
    inputValue,
    activeTab,
    setInputValue,
    setActiveTab,
    handleSend,
    handleQuickAction,
    handleImageUpload,
    handleVideoUpload,
    handleFileUpload,
  } = useChatBot();

  return (
    <div className="chatbot-container">
      <ChatHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onClose={onClose}
      />
      <MessageList messages={messages} onQuickAction={handleQuickAction} />
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        onImageUpload={handleImageUpload}
        onVideoUpload={handleVideoUpload}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
};

export default ChatBot;

