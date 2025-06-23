// @ts-check
import partytown from '@astrojs/partytown';
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
  site: 'https://www.svtech.cl',
  integrations: [sitemap(), partytown()],
});
