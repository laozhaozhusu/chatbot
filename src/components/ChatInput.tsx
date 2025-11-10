import React from "react";
import type { ChatInputProps } from "./types";

/**
 * 聊天输入组件
 * 职责：处理用户输入、工具按钮和发送消息
 */
const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="chatbot-input-wrapper">
      <div className="chatbot-input-top">
        <input
          type="text"
          className="message-input"
          placeholder="输入信息..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="chatbot-input-bottom">
        <div className="chatbot-input-buttons">
          <button className="input-btn emoji-btn" title="表情">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="9" cy="10" r="1.5" />
              <circle cx="15" cy="10" r="1.5" />
              <path
                d="M8 14s1.5 2 4 2 4-2 4-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button className="input-btn image-btn" title="图片">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path
                d="M21 15l-5-5L5 21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button className="input-btn video-btn" title="视频">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect
                x="2"
                y="6"
                width="14"
                height="12"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M16 11l6-4v10l-6-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="input-btn attach-btn" title="附件">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <button className="send-btn" onClick={onSend}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
      <div className="chatbot-input-footer">Powered by SaleSmartly</div>
    </div>
  );
};

export default ChatInput;
