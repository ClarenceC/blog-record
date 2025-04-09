// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import preact from "@astrojs/preact";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "http://www.f2ex.cc",
  integrations: [preact()],
  image: {
    service: passthroughImageService(),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
