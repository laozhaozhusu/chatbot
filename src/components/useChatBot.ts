import { useState } from "react";
import type { Message, TabType } from "./types";

/**
 * 生成时间戳
 */
const generateTimestamp = (): string => {
  const now = new Date();
  return `${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
};

/**
 * 获取机器人回复内容
 */
const getBotReply = (action: string): string => {
  if (action === "使用常见问题") {
    return "以下是一些常见问题：\n1. 如何注册账号？\n2. 如何联系客服？\n3. 支持哪些支付方式？";
  } else if (action === "salesmartly使用指南") {
    return "SaleSmarty使用指南：\n1. 点击开始聊天\n2. 输入您的问题\n3. 我们的团队会及时回复";
  } else {
    return "感谢您的咨询，有什么可以帮助您的吗？";
  }
};

/**
 * 初始消息列表
 */
const initialMessages: Message[] = [
  {
    id: 1,
    type: "bot",
    content: "欢迎使用SaleSmarty",
    timestamp: "11-10 16:27:52",
  },
  {
    id: 2,
    type: "bot",
    content: "salesmartly使用指南",
    timestamp: "11-10 16:27:52",
  },
  {
    id: 3,
    type: "bot",
    content: "使用常见问题",
    timestamp: "11-10 16:27:52",
  },
];

/**
 * ChatBot 业务逻辑Hook
 * 职责：管理消息状态、标签页状态和业务逻辑
 */
export const useChatBot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("message");

  /**
   * 发送消息
   */
  const handleSend = () => {
    if (!inputValue.trim()) return;

    const timestamp = generateTimestamp();
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // 模拟机器人回复
    setTimeout(() => {
      const botReply: Message = {
        id: messages.length + 2,
        type: "bot",
        content: "感谢您的消息！我们会尽快回复您。",
        timestamp,
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  /**
   * 快速操作
   */
  const handleQuickAction = (action: string) => {
    const timestamp = generateTimestamp();
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: action,
      timestamp,
    };

    setMessages((prev) => [...prev, userMessage]);

    // 模拟机器人回复
    setTimeout(() => {
      const reply = getBotReply(action);
      const botReply: Message = {
        id: messages.length + 2,
        type: "bot",
        content: reply,
        timestamp,
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  return {
    messages,
    inputValue,
    activeTab,
    setInputValue,
    setActiveTab,
    handleSend,
    handleQuickAction,
  };
};
