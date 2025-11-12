/**
 * 消息内容类型
 */
export type MessageContentType = "text" | "image" | "video" | "file";

/**
 * 消息内容
 */
export interface MessageContent {
  type: MessageContentType;
  text?: string;
  url?: string;
  fileName?: string;
  fileSize?: number;
}

/**
 * 消息类型定义
 */
export interface Message {
  id: number;
  type: "bot" | "user";
  content: string | MessageContent[];
  timestamp: string;
}

/**
 * 标签页类型
 */
export type TabType = "message" | "help";

/**
 * ChatBot 组件属性
 */
export interface ChatBotProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

/**
 * ChatHeader 组件属性
 */
export interface ChatHeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onClose?: () => void;
  onMinimize?: () => void;
}

/**
 * Message 组件属性
 */
export interface MessageProps {
  message: Message;
  onQuickAction?: (action: string) => void;
}

/**
 * MessageList 组件属性
 */
export interface MessageListProps {
  messages: Message[];
  onQuickAction?: (action: string) => void;
}

/**
 * ChatInput 组件属性
 */
export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onImageUpload?: (file: File) => void;
  onVideoUpload?: (file: File) => void;
  onFileUpload?: (file: File) => void;
}

