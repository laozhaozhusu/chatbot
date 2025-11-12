import React from "react";
import ReactDOM from "react-dom/client";
import { ChatBot } from "./components";
import "./ChatBot.css";
import "./index.css";

interface ChatBotWidgetConfig {
  container?: string | HTMLElement;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  autoOpen?: boolean;
}

class ChatBotWidget {
  private iframe: HTMLIFrameElement | null = null;
  private container: HTMLElement | null = null;
  private button: HTMLElement | null = null;
  private isOpen: boolean = false;
  private isLoaded: boolean = false;
  private config: ChatBotWidgetConfig;

  constructor(config: ChatBotWidgetConfig = {}) {
    this.config = {
      position: "bottom-right",
      autoOpen: false,
      ...config,
    };

    // 监听来自iframe的消息
    this.setupMessageListener();
  }

  /**
   * 设置消息监听器，接收来自iframe的消息
   */
  private setupMessageListener() {
    window.addEventListener("message", (event) => {
      // 安全检查：只接受来自我们iframe的消息
      if (event.data && event.data.type === "CHATBOT_CLOSE") {
        this.close();
      }
    });
  }

  /**
   * 生成iframe的HTML内容
   * 直接在iframe中引用CSS文件
   */
  private getIframeHTML(): string {
    // 获取CSS文件路径
    const cssPath = this.getCSSPath();

    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ChatBot</title>
  <link rel="stylesheet" href="${cssPath}">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    #chatbot-root {
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <div id="chatbot-root"></div>
</body>
</html>
    `;
  }

  /**
   * 获取CSS文件路径
   */
  private getCSSPath(): string {
    // 尝试从当前脚本路径推断CSS路径
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].src;
      if (src && src.includes("chatbot-widget")) {
        // 将 chatbot-widget.iife.js 替换为 chatbot-widget.css
        return src.replace("chatbot-widget.iife.js", "chatbot-widget.css");
      }
    }
    // 默认路径
    return "./dist/chatbot-widget.css";
  }

  init() {
    // 创建容器
    this.container = document.createElement("div");
    this.container.id = "chatbot-widget-root";
    this.container.style.cssText = this.getContainerStyles();
    document.body.appendChild(this.container);

    // 创建聊天气泡按钮
    this.button = document.createElement("div");
    this.button.id = "chatbot-widget-button";
    this.button.style.cssText = this.getButtonStyles();
    this.button.innerHTML = this.getButtonHTML();
    this.button.onclick = () => this.toggle();
    document.body.appendChild(this.button);

    // 如果设置了自动打开
    if (this.config.autoOpen) {
      this.open();
    }
  }

  private getContainerStyles(): string {
    const position = this.config.position || "bottom-right";
    const baseStyles = `
      position: fixed;
      z-index: 999999;
      display: none;
      animation: slideIn 0.3s ease;
      width: 400px;
      height: 600px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      border-radius: 16px;
      overflow: hidden;
    `;

    const positions = {
      "bottom-right": "bottom: 100px; right: 20px;",
      "bottom-left": "bottom: 100px; left: 20px;",
      "top-right": "top: 20px; right: 20px;",
      "top-left": "top: 20px; left: 20px;",
    };

    return baseStyles + positions[position];
  }

  private getButtonStyles(): string {
    const position = this.config.position || "bottom-right";
    const baseStyles = `
      position: fixed;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #5b6fd8 0%, #4a5fc7 100%);
      box-shadow: 0 4px 12px rgba(91, 111, 216, 0.4);
      cursor: pointer;
      z-index: 999998;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    `;

    const positions = {
      "bottom-right": "bottom: 20px; right: 20px;",
      "bottom-left": "bottom: 20px; left: 20px;",
      "top-right": "top: 20px; right: 20px;",
      "top-left": "top: 20px; left: 20px;",
    };

    return baseStyles + positions[position];
  }

  private getButtonHTML(): string {
    return `
      <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
        <path d="M16 3C8.82 3 3 8.37 3 15c0 2.97 1.16 5.69 3.08 7.82L4.5 28l5.82-2.42C12.11 26.5 13.98 27 16 27c7.18 0 13-5.37 13-12S23.18 3 16 3zm0 21.5c-1.79 0-3.47-.45-4.95-1.23l-.35-.18-3.64 1.51 1.55-3.52-.21-.37C6.66 18.85 6 16.99 6 15c0-5.24 4.48-9.5 10-9.5s10 4.26 10 9.5-4.48 9.5-10 9.5z"/>
        <circle cx="11" cy="14" r="1.5"/>
        <circle cx="16" cy="14" r="1.5"/>
        <circle cx="21" cy="14" r="1.5"/>
      </svg>
    `;
  }

  open() {
    if (!this.container) return;

    this.isOpen = true;
    this.container.style.display = "block";

    // 隐藏按钮
    if (this.button) {
      this.button.style.display = "none";
    }

    // 如果iframe还未创建，创建并加载
    if (!this.isLoaded) {
      this.createIframe();
      this.isLoaded = true;
    }
  }

  /**
   * 创建iframe并加载ChatBot
   */
  private createIframe() {
    if (!this.container) return;

    // 清空容器
    this.container.innerHTML = "";

    // 创建iframe，使用srcdoc直接嵌入HTML内容
    this.iframe = document.createElement("iframe");
    this.iframe.id = "chatbot-widget-iframe";
    this.iframe.srcdoc = this.getIframeHTML();
    this.iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    `;

    // 设置iframe属性以提高安全性
    this.iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
    this.iframe.setAttribute("title", "ChatBot Widget");

    this.container.appendChild(this.iframe);

    // 等待iframe加载完成后渲染ChatBot
    this.iframe.onload = () => {
      this.renderChatBotInIframe();
    };
  }

  /**
   * 在iframe中渲染ChatBot组件
   */
  private renderChatBotInIframe() {
    if (!this.iframe || !this.iframe.contentWindow) return;

    try {
      const iframeDocument = this.iframe.contentDocument;

      if (!iframeDocument) {
        console.error("Cannot access iframe document");
        return;
      }

      // 在iframe中创建React根节点
      const rootElement = iframeDocument.getElementById("chatbot-root");
      if (!rootElement) {
        console.error("ChatBot root element not found in iframe");
        return;
      }

      const root = ReactDOM.createRoot(rootElement);

      // 渲染ChatBot组件
      root.render(
        <React.StrictMode>
          <ChatBot
            onClose={() => {
              // 关闭聊天窗口
              this.close();
            }}
            onMinimize={() => {
              // 最小化聊天窗口，显示聊天气泡
              this.close();
            }}
          />
        </React.StrictMode>
      );

      console.log("ChatBot rendered successfully in iframe");
    } catch (error) {
      console.error("Failed to render ChatBot in iframe:", error);
      this.showError();
    }
  }

  close() {
    if (!this.container) return;

    this.isOpen = false;
    this.container.style.display = "none";

    // 显示按钮
    if (this.button) {
      this.button.style.display = "flex";
    }
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * 显示错误状态
   */
  private showError() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background: white;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      ">
        <div style="font-size: 48px; color: #ff6b6b;">⚠️</div>
        <p style="color: #ff6b6b; margin-top: 20px;">加载失败，请刷新页面重试</p>
        <button onclick="location.reload()" style="
          margin-top: 20px;
          padding: 10px 20px;
          background: #5b6fd8;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        ">刷新页面</button>
      </div>
    `;
  }

  destroy() {
    if (this.iframe) {
      this.iframe.remove();
      this.iframe = null;
    }
    if (this.container) {
      document.body.removeChild(this.container);
      this.container = null;
    }
    if (this.button) {
      document.body.removeChild(this.button);
      this.button = null;
    }
    this.isLoaded = false;
    this.isOpen = false;
  }
}

// 添加样式动画
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  #chatbot-widget-button:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(91, 111, 216, 0.5);
  }

  #chatbot-widget-button:active {
    transform: scale(0.95);
  }
`;
document.head.appendChild(style);

// 导出到全局
declare global {
  interface Window {
    ChatBotWidget: typeof ChatBotWidget;
  }
}

window.ChatBotWidget = ChatBotWidget;

// 默认导出
export default ChatBotWidget;
