import { defineConfig } from "vite-plus";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const isTest = process.env.VITEST === "true";

const config = defineConfig({
  fmt: {
    ignorePatterns: ["src/routeTree.gen.ts"],
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
  plugins: [
    devtools(),
    !isTest &&
      (async () => {
        const { cloudflare } = await import("@cloudflare/vite-plugin");
        return cloudflare({ viteEnvironment: { name: "ssr" } });
      })(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ].filter(Boolean),
});

export default config;
