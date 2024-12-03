import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
  build: {
    rollupOptions: {
      external: [
        "@capacitor-community/stripe/dist/esm/stripe-payment-request-button",
      ],
    },
  },
});
