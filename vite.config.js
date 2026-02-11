import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Growing Up',
        short_name: 'Growing Up',
        description: 'An educational app for adolescent girls.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        id: '/',
        orientation: 'portrait',
        icons: [
          {
            src: 'icon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: 'screenshot-mobile.svg',
            sizes: '360x640',
            type: 'image/svg+xml',
            form_factor: 'narrow',
            label: 'Mobile Home Screen'
          },
          {
            src: 'screenshot-desktop.svg',
            sizes: '1280x800',
            type: 'image/svg+xml',
            form_factor: 'wide',
            label: 'Desktop Dashboard'
          }
        ]
      }
    })
  ],
  server: {
    host: true, // Allow network access
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
