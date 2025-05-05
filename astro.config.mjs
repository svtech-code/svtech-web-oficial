// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  output: "static",
  // trailingSlash: "always",
  site: "https://www.svtech.cl",
});
