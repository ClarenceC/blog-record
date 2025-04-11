// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import partytown from "@astrojs/partytown";
import preact from "@astrojs/preact";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "http://www.f2ex.cc",
  markdown: {
    shikiConfig: {
      theme: "dracula",
      // themes: {
      //   light: "github-light",
      //   dark: "github-dark",
      // },
    },
  },
  integrations: [
    preact(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  image: {
    service: passthroughImageService(),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
