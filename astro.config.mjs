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
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/api/'),
      serialize(item) {
        if (item.url === 'https://www.svtech.cl/' || item.url === 'https://www.svtech.cl') {
          item.changefreq = 'weekly';
          item.priority = 1.0;
        } else if (item.url.includes('/services/')) {
          item.changefreq = 'monthly';
          item.priority = 0.9;
        } else if (item.url.endsWith('/blog') || item.url.endsWith('/blog/')) {
          item.changefreq = 'weekly';
          item.priority = 0.85;
        } else if (item.url.includes('/blog/')) {
          item.changefreq = 'monthly';
          item.priority = 0.8;
        }
        return item;
      },
    }),
    partytown(),
  ],

  // Optimizaciones de build
  build: {
    // Inlinear assets pequeños
    inlineStylesheets: 'auto',
  },
});
