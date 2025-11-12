import React from "react";
import type { ChatHeaderProps } from "./types";

/**
 * 聊天头部组件
 * 职责：显示标签页、机器人信息、社交链接、最小化按钮、关闭按钮
 */
const ChatHeader: React.FC<ChatHeaderProps> = ({
  activeTab,
  onTabChange,
  onClose,
  onMinimize,
}) => {
  return (
    <div className="chatbot-header">
      <div className="header-top">
        <div className="header-tabs">
          <button
            className={`tab ${activeTab === "message" ? "active" : ""}`}
            onClick={() => onTabChange("message")}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4.5l-2.5 2V3z" />
            </svg>
            消息
          </button>
          <button
            className={`tab ${activeTab === "help" ? "active" : ""}`}
            onClick={() => onTabChange("help")}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
              <path d="M8 5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 8 5z" />
            </svg>
            帮助
          </button>
        </div>

        <div className="header-actions">
          {/* 最小化按钮 */}
          <button className="minimize-btn" onClick={onMinimize}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
          </button>

          {/* 关闭按钮 */}
          <button className="close-btn" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="header-info">
        <div className="bot-avatar">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="white">
            <circle cx="20" cy="15" r="5" />
            <path d="M12 28c0-4.4 3.6-8 8-8s8 3.6 8 8v2H12v-2z" />
            <rect x="15" y="8" width="2" height="4" />
            <rect x="23" y="8" width="2" height="4" />
          </svg>
        </div>
        <div className="bot-info">
          <h3>SaleSmarty</h3>
          <p className="service-time">人工服务时间：10:00-23:00 UTC(+8)</p>
        </div>
      </div>

      {/* <div className="social-links">
        <a href="#" className="social-icon wechat" title="微信">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          </svg>
        </a>
        <a href="#" className="social-icon whatsapp" title="WhatsApp">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.08L2 22l4.92-1.38C8.42 21.5 10.15 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
          </svg>
        </a>
        <a href="#" className="social-icon telegram" title="Telegram">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8-1.6 7.52c-.12.54-.44.67-.89.42l-2.46-1.82-1.19 1.14c-.13.13-.24.24-.49.24l.17-2.44 4.47-4.04c.19-.17-.04-.27-.3-.1L9.39 13.3l-2.44-.77c-.53-.17-.54-.53.11-.78l9.57-3.69c.44-.17.83.1.68.78z" />
          </svg>
        </a>
      </div> */}
    </div>
  );
};

export default ChatHeader;
