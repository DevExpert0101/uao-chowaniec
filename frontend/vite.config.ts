import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http://backend:8001",
          changeOrigin: true,
        },
      },
      hmr: false,
      host: true,
      port: 8080,
      watch: {
        ignored: '**/*',
      },
    },
  };
});
