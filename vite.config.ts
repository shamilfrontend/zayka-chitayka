import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/reader-bunny/",
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "Зайка-Читайка",
        short_name: "Читайка",
        description: "Учимся читать по-русски: буквы, слоги и слова",
        theme_color: "#7ec8a3",
        background_color: "#fff8f0",
        display: "standalone",
        lang: "ru",
        start_url: "/reader-bunny/",
        scope: "/reader-bunny/",
        icons: [
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,svg,woff2,woff,ttf}"],
      },
    }),
    {
      name: "spa-github-pages-fallback",
      closeBundle() {
        const indexHtml = resolve(__dirname, "dist/index.html");
        const notFoundHtml = resolve(__dirname, "dist/404.html");
        if (existsSync(indexHtml)) {
          copyFileSync(indexHtml, notFoundHtml);
        }
      },
    },
  ],
});
