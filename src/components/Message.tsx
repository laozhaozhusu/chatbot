import React from "react";
import type { MessageProps, MessageContent } from "./types";

/**
 * 格式化文件大小
 */
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
};

/**
 * 渲染消息内容
 */
const renderMessageContent = (content: string | MessageContent[]) => {
  // 如果是字符串，直接返回文本
  if (typeof content === "string") {
    return <div className="message-text">{content}</div>;
  }

  // 如果是数组，渲染不同类型的内容
  return (
    <div className="message-content-list">
      {content.map((item, index) => {
        switch (item.type) {
          case "text":
            return (
              <div key={index} className="message-text">
                {item.text}
              </div>
            );
          case "image":
            return (
              <div key={index} className="message-media message-image">
                <img src={item.url} alt={item.fileName || "图片"} />
                {item.fileName && (
                  <div className="message-media-info">
                    {item.fileName}
                    {item.fileSize && ` (${formatFileSize(item.fileSize)})`}
                  </div>
                )}
              </div>
            );
          case "video":
            return (
              <div key={index} className="message-media message-video">
                <video controls src={item.url} />
                {item.fileName && (
                  <div className="message-media-info">
                    {item.fileName}
                    {item.fileSize && ` (${formatFileSize(item.fileSize)})`}
                  </div>
                )}
              </div>
            );
          case "file":
            return (
              <div key={index} className="message-file">
                <div className="message-file-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                    <path d="M14 2v6h6" />
                  </svg>
                </div>
                <div className="message-file-info">
                  <div className="message-file-name">{item.fileName || "文件"}</div>
                  {item.fileSize && (
                    <div className="message-file-size">
                      {formatFileSize(item.fileSize)}
                    </div>
                  )}
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    download={item.fileName}
                    className="message-file-download"
                    title="下载文件"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

/**
 * 单条消息组件
 * 职责：显示单条消息内容、头像、时间戳和快速操作按钮
 */
const Message: React.FC<MessageProps> = ({ message, onQuickAction }) => {
  const { type, content, timestamp } = message;
  const isTextContent = typeof content === "string";
  const textContent = isTextContent ? content : "";

  return (
    <div className={`message ${type}`}>
      {type === "bot" && (
        <div className="message-avatar">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
            <circle cx="16" cy="12" r="4" />
            <path d="M10 22c0-3.3 2.7-6 6-6s6 2.7 6 6v2H10v-2z" />
          </svg>
        </div>
      )}
      <div className="message-content">
        <div className="message-bubble">{renderMessageContent(content)}</div>
        {type === "bot" &&
          isTextContent &&
          textContent !== "欢迎使用SaleSmarty" &&
          onQuickAction && (
            <button
              className="quick-action-btn"
              onClick={() => onQuickAction(textContent)}
            >
              {textContent}
            </button>
          )}
        <div className="message-timestamp">{timestamp}</div>
      </div>
    </div>
  );
};

export default Message;

