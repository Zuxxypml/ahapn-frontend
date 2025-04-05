import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  base: "/edo2025",  // Ensures assets are served under /edo2025
  build: {
    outDir: "build",  // Matches your deployment setup
  },
});
