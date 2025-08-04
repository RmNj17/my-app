import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Add specific handling for JSON imports
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  // Ensure JSON files are properly processed
  assetsInclude: ["**/*.json"],
});
