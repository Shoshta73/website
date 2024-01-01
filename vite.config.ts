import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@Pages": path.resolve(__dirname, "./src/pages"),
      "@Components": path.resolve(__dirname, "./src/components"),
      "@Clients": path.resolve(__dirname, "./src/clients"),
      "@Hooks": path.resolve(__dirname, "./src/hooks"),
      "@Utils": path.resolve(__dirname, "./src/utils"),
      "@Types": path.resolve(__dirname, "./src/types"),
    },
  },
});
