import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://sebastian-schleemilch.de",
  markdown: {
    shikiConfig: {
      // Alternatively, provide multiple themes
      // See note below for using dual light/dark themes
      themes: {
        light: "rose-pine-dawn",
        dark: "rose-pine-moon",
      },
      // Disable the default colors
      // https://shiki.style/guide/dual-themes#without-default-color
      // (Added in v4.12.0)
      defaultColor: false,
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://shiki.style/languages
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
      // Add custom transformers: https://shiki.style/guide/transformers
      // Find common transformers: https://shiki.style/packages/transformers
      transformers: [],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [icon(), sitemap()],
});
