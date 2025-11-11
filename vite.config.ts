import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isServe = command === "serve";

  return {
    plugins: [react()],
    // 本地开发使用项目根目录，方便使用 index.html 启动 HMR 调试
    // 构建库模式时无需 root
    ...(isServe ? { root: "." } : {}),
    define: isServe
      ? {
          "process.env": {},
        }
      : {
          "process.env": {},
          "process.env.NODE_ENV": JSON.stringify("production"),
        },
    server: isServe
      ? {
          open: "/index.html",
          // 如需在 iframe 或非同源环境下调试，可按需开启下面两行
          // hmr: { clientPort: 5173 },
          // cors: true,
        }
      : undefined,
    // 生产构建仍然走库模式，输出 IIFE 以便外部直接 script 引入
    build: {
      lib: {
        entry: resolve(__dirname, "src/widget.tsx"),
        name: "ChatBotWidget",
        fileName: "chatbot-widget",
        formats: ["iife"],
      },
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
          // 将CSS内联到JS中
          assetFileNames: (assetInfo) => {
            return assetInfo.name === "style.css"
              ? "chatbot-widget.css"
              : "[name].[ext]";
          },
        },
      },
      cssCodeSplit: false,
      minify: "esbuild",
      outDir: "dist",
      emptyOutDir: false,
    },
    css: {
      modules: {
        localsConvention: "camelCase",
      },
    },
  };
});
