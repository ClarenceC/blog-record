// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import partytown from "@astrojs/partytown";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://fe2x.cc",
  markdown: {
    shikiConfig: {
      // Inline colors are off so global.css can follow html.dark,
      // including when the toggle disagrees with the system theme.
      themes: {
        light: "github-light",
        dark: "dracula",
      },
      defaultColor: false,
    },
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [
    preact(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  build: {
    // Post CSS is ~6KB gzip but split into two render-blocking files.
    // Inlining removes that second round trip from LCP.
    inlineStylesheets: "always",
  },
  image: {
    service: passthroughImageService(),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
