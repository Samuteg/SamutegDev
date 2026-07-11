// @ts-check

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import keystatic from "@keystatic/astro";

const dev = process.env.NODE_ENV !== "production";

// https://astro.build/config
export default defineConfig({
  site: "https://samuteg.dev",
  build: {
    // sourcemap is not a valid option here in newer Astro versions
  },
  integrations: [react(), mdx(), sitemap(), ...(dev ? [keystatic()] : [])],
  // Fonts are loaded via @import in global.css (Inter + JetBrains Mono from Google Fonts)
  // No local font configuration needed
});
