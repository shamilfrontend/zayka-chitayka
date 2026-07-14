import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { registerSW } from "virtual:pwa-register";
import "@fontsource/comfortaa/400.css";
import "@fontsource/comfortaa/600.css";
import "@fontsource/comfortaa/700.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/800.css";
import "./styles/tokens.css";

registerSW({ immediate: true });

createApp(App).use(router).mount("#app");
