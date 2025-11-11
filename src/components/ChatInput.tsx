import React, { useState, useRef } from "react";
import type { ChatInputProps } from "./types";
import EmojiPicker from "./EmojiPicker";

/**
 * 聊天输入组件
 * 职责：处理用户输入、工具按钮和发送消息
 */
const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  onImageUpload,
  onVideoUpload,
  onFileUpload,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  /**
   * 处理表情选择
   */
  const handleEmojiSelect = (emoji: string) => {
    onChange(value + emoji);
  };

  /**
   * 处理图片上传
   */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload) {
      // 验证文件类型
      if (!file.type.startsWith("image/")) {
        alert("请选择图片文件");
        return;
      }
      // 验证文件大小（最大10MB）
      if (file.size > 10 * 1024 * 1024) {
        alert("图片大小不能超过10MB");
        return;
      }
      onImageUpload(file);
    }
    // 重置input值，允许重复选择同一文件
    if (e.target) {
      e.target.value = "";
    }
  };

  /**
   * 处理视频上传
   */
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onVideoUpload) {
      // 验证文件类型
      if (!file.type.startsWith("video/")) {
        alert("请选择视频文件");
        return;
      }
      // 验证文件大小（最大50MB）
      if (file.size > 50 * 1024 * 1024) {
        alert("视频大小不能超过50MB");
        return;
      }
      onVideoUpload(file);
    }
    // 重置input值
    if (e.target) {
      e.target.value = "";
    }
  };

  /**
   * 处理附件上传
   */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      // 验证文件大小（最大100MB）
      if (file.size > 100 * 1024 * 1024) {
        alert("文件大小不能超过100MB");
        return;
      }
      onFileUpload(file);
    }
    // 重置input值
    if (e.target) {
      e.target.value = "";
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
          {/* 表情按钮 */}
          <button
            ref={emojiButtonRef}
            className="input-btn emoji-btn emoji-picker-trigger"
            title="表情"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
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
          {/* 图片上传按钮 */}
          <button
            className="input-btn image-btn"
            title="图片"
            onClick={() => imageInputRef.current?.click()}
          >
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
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </button>
          {/* 视频上传按钮 */}
          <button
            className="input-btn video-btn"
            title="视频"
            onClick={() => videoInputRef.current?.click()}
          >
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
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={handleVideoUpload}
            />
          </button>
          {/* 附件上传按钮 */}
          <button
            className="input-btn attach-btn"
            title="附件"
            onClick={() => fileInputRef.current?.click()}
          >
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
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </button>
        </div>
        <button className="send-btn" onClick={onSend}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
      {/* 表情选择器 - 使用 Portal 渲染到 body，固定定位 */}
      {showEmojiPicker && (
        <EmojiPicker
          onSelect={handleEmojiSelect}
          onClose={() => setShowEmojiPicker(false)}
          triggerRef={emojiButtonRef}
        />
      )}
      <div className="chatbot-input-footer">Powered by SaleSmartly</div>
    </div>
  );
};

export default ChatInput;
