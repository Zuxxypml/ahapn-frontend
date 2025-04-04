import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteTsconfigPaths()],
  base: "/edo2025",  // Ensures assets are served under /edo2025
  build: {
    outDir: "build",  // Matches your deployment setup
  },
});
