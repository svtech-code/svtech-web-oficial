// @ts-check
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Optimizaciones para reducir bundle size y mejorar loading
      rollupOptions: {
        output: {
          // Separar vendor chunks para mejor caching
          manualChunks: {
            // Separar EmailJS en su propio chunk (solo se carga cuando se necesita)
            emailjs: ['src/lib/emailjs-client.ts'],
            // Separar iconos y mapas en su propio chunk
            icons: ['src/consts/iconsMap.ts', 'src/consts/icons.ts'],
          },
        },
      },
      // Optimizar CSS
      cssCodeSplit: true,
      // Reducir threshold para chunks más pequeños
      chunkSizeWarningLimit: 1000,
    },
    // Optimizaciones de performance
    optimizeDeps: {
      // Pre-bundle solo dependencias críticas
      include: [],
      exclude: ['@emailjs/browser'], // EmailJS se carga lazy
    },
  },

  output: 'server',
  adapter: vercel(),
  site: 'https://www.svtech.cl',
  integrations: [sitemap(), partytown()],

  // Optimizaciones de build
  build: {
    // Inlinear assets pequeños
    inlineStylesheets: 'auto',
  },
});
