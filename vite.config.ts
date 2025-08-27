import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy(), basicSsl()],
  // test: {
  //   globals: true,
  //   environment: "jsdom",
  //   setupFiles: "./src/setupTests.ts",
  // },
  server: {
    allowedHosts: ['7dac-176-38-25-248.ngrok-free.app']
  },
});
