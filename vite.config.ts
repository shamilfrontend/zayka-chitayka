import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "icon-192.png",
        "icon-512.png",
        "author.png",
        "author-saida.png",
        "mascot/bunny-cheer.webp",
        "mascot/bunny-idle.webp",
        "mascot/bunny-sad.webp",
        "mascot/bunny-think.webp",
        "robots.txt",
        "sitemap.xml",
      ],
      manifest: {
        name: "Зайка-Читайка",
        short_name: "Читайка",
        description:
          "Учимся читать и считать по-русски: буквы, слоги, слова, цифры и числа",
        theme_color: "#7ec8a3",
        background_color: "#fff8f0",
        display: "standalone",
        lang: "ru",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,svg,png,webp,woff2,woff,ttf}"],
      },
    }),
  ],
});
