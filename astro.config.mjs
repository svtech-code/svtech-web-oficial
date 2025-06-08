// @ts-check
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  output: 'server',
  adapter: vercel(),
  integrations: [sitemap()],
  site: 'https://www.svtech.cl',
});

