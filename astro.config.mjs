// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  output: "static",
  adapter: vercel(),
  // trailingSlash: "always",
  // site: "https://www.svtech.cl",
});
