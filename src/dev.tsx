import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import ChatBotWidget from "./widget";
import "./ChatBot.css";
import "./index.css";

function DevApp() {
  const [status, setStatus] = useState<string>("正在加载...");
  const [logs, setLogs] = useState<Array<{ type: "info" | "success" | "error" | "warn"; text: string; time: string }>>([]);
  const widgetRef = useRef<ChatBotWidget | null>(null);

  const colors = useMemo(
    () => ({
      info: "#4fc3f7",
      success: "#66bb6a",
      error: "#ef5350",
      warn: "#ffa726",
    }),
    []
  );

  const log = (text: string, type: "info" | "success" | "error" | "warn" = "info") => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { type, text, time }]);
    // 同步到控制台，便于调试
    const fn = type === "error" ? console.error : type === "warn" ? console.warn : console.log;
    fn(`[${time}] [${type.toUpperCase()}] ${text}`);
  };

  useEffect(() => {
    window.onerror = function (msg) {
      const message = typeof msg === "string" ? msg : String(msg);
      log(`错误: ${message}`, "error");
      if (message.includes("process is not defined")) {
        setStatus("❌ 错误：process is not defined 仍然存在！");
      }
      return false;
    };

    try {
      log("开始初始化 ChatBot Widget...", "info");

      widgetRef.current = new ChatBotWidget({
        position: "bottom-right",
        autoOpen: false,
      });

      log("ChatBotWidget 实例已创建", "success");

      widgetRef.current.init();

      log("ChatBotWidget 初始化成功！", "success");
      setStatus("✅ 成功！ChatBot Widget 已加载，没有 process.env 错误。");
    } catch (error: any) {
      const message = error?.message ?? String(error);
      log(`初始化失败: ${message}`, "error");
      setStatus(`❌ 初始化失败: ${message}`);
    }

    return () => {
      try {
        widgetRef.current?.destroy();
        widgetRef.current = null;
      } catch {}
    };
  }, []);

  const handleOpen = () => {
    if (!widgetRef.current) {
      log("ChatBot 未初始化", "error");
      return;
    }
    try {
      widgetRef.current.open();
      log("打开聊天窗口", "success");
    } catch (e: any) {
      log(`打开失败: ${e?.message ?? String(e)}`, "error");
    }
  };

  const handleClose = () => {
    if (!widgetRef.current) {
      log("ChatBot 未初始化", "error");
      return;
    }
    try {
      widgetRef.current.close();
      log("关闭聊天窗口", "success");
    } catch (e: any) {
      log(`关闭失败: ${e?.message ?? String(e)}`, "error");
    }
  };

  const handleToggle = () => {
    if (!widgetRef.current) {
      log("ChatBot 未初始化", "error");
      return;
    }
    try {
      widgetRef.current.toggle();
      log("切换聊天窗口状态", "success");
    } catch (e: any) {
      log(`切换失败: ${e?.message ?? String(e)}`, "error");
    }
  };

  const handleReload = () => {
    location.reload();
  };

  return (
    <div style={{ width: "100%", minHeight: "100%", background: "#f5f5f5" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
        <div style={{ background: "#fff", padding: 20, borderRadius: 8, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h1 style={{ margin: 0 }}>🧪 ChatBot Widget - 简单测试（开发）</h1>
          <p style={{ margin: "8px 0 0", color: "#666" }}>
            模仿 test-simple.html 的最小测试场景，带按钮与状态显示，支持 HMR。
          </p>
        </div>

        <div style={{ background: "#fff", padding: 20, borderRadius: 8, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0 }}>测试状态</h2>
          <div>{status}</div>
        </div>

        <div style={{ background: "#fff", padding: 20, borderRadius: 8, marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0 }}>控制按钮</h2>
          <div>
            <button onClick={handleOpen} style={{ padding: "10px 20px", background: "#5b6fd8", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 16, margin: 5 }}>
              打开聊天窗口
            </button>
            <button onClick={handleClose} style={{ padding: "10px 20px", background: "#5b6fd8", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 16, margin: 5 }}>
              关闭聊天窗口
            </button>
            <button onClick={handleToggle} style={{ padding: "10px 20px", background: "#5b6fd8", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 16, margin: 5 }}>
              切换聊天窗口
            </button>
            <button onClick={handleReload} style={{ padding: "10px 20px", background: "#5b6fd8", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 16, margin: 5 }}>
              刷新页面
            </button>
          </div>
        </div>

        <div style={{ background: "#fff", padding: 20, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0 }}>控制台输出</h2>
          <div
            style={{
              background: "#1e1e1e",
              color: "#d4d4d4",
              padding: 15,
              borderRadius: 5,
              fontFamily: '"Monaco", "Courier New", monospace',
              fontSize: 13,
              maxHeight: 300,
              overflowY: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {logs.map((l, i) => (
              <div key={i} style={{ color: colors[l.type], margin: "5px 0" }}>
                [{l.time}] [{l.type.toUpperCase()}] {l.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <DevApp />
    </React.StrictMode>
  );
}


