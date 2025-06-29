import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    emptyOutDir: true,
    rollupOptions: {
      input: "src/main.jsx",
      output: {
        entryFileNames: "widget.js",
        format: "iife", // 讓打包後 JS 能立即執行
        name: "FAQChatWidget",
      },
    },
  },
});
