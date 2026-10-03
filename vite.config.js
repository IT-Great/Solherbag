import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate', // Otomatis update Service Worker jika ada versi web baru
      injectRegister: 'auto',

      // Strategi caching file statis (HTML, CSS, JS, Font, Gambar di Vue)
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg}'],
        runtimeCaching: [
          {
            // 👇 CACHE UNTUK API LARAVEL (KATALOG) 👇
            urlPattern: /^https:\/\/back\.solher\.co\.id\/api\/.*/i,
            handler: 'NetworkFirst', // Coba ambil dari internet dulu, jika mati, ambil dari cache lokal
            options: {
              cacheName: 'solher-api-cache',
              expiration: {
                maxEntries: 100, // Maksimal simpan 100 request API
                maxAgeSeconds: 60 * 60 * 24 * 7 // Expire dalam 7 hari
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // 👇 CACHE UNTUK GAMBAR PRODUK DARI BACKEND 👇
            urlPattern: /^https:\/\/back\.solher\.co\.id\/storage\/.*/i,
            handler: 'CacheFirst', // Ambil dari cache dulu agar loading gambar super cepat
            options: {
              cacheName: 'solher-image-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30 // Simpan gambar selama 30 hari
              }
            }
          }
        ]
      },

      // Manifest Web (Untuk diinstal ke Homescreen HP)
      manifest: {
        name: 'Solher - Premium Fashion',
        short_name: 'Solher',
        description: 'Exclusive fashion and premium bags.',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone', // Hilangkan address bar browser saat dibuka di HP
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // Agar bentuk ikon menyesuaikan sistem Android/iOS
          }
        ]
      }
    })
  ]
});