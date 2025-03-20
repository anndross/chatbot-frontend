import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr({ include: "**/*.svg" })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // build: {
  //   lib: {
  //     entry: "src/main.tsx",
  //     name: "Widget",
  //     fileName: (format) => `widget.${format}.js`, // Garante .js em vez de .cjs
  //     formats: ["umd", "es"], // Mantemos UMD e ES
  //   },
  //   rollupOptions: {
  //     external: ["react", "react-dom"], // Garante que React não seja incluído no bundle
  //     output: {
  //       globals: {
  //         react: "React",
  //         "react-dom": "ReactDOM",
  //       },
  //     },
  //   },
  // },
  server: {
    open: true,
    port: 5173,
  },
});
