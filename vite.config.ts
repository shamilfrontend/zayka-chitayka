import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "author.png"],
      manifest: {
        name: "Зайка-Читайка",
        short_name: "Читайка",
        description: "Учимся читать и считать по-русски: буквы, слоги, слова, цифры и числа",
        theme_color: "#7ec8a3",
        background_color: "#fff8f0",
        display: "standalone",
        lang: "ru",
        start_url: "/",
        scope: "/",
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
        globPatterns: ["**/*.{js,css,html,ico,svg,png,woff2,woff,ttf}"],
      },
    }),
  ],
});
