/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

import "vue-router";

export {};

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

declare module "vue-router" {
  interface RouteMeta {
    equationOp?: import("./data/equations").EquationOp;
  }
}
