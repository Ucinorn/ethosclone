import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Ethos Clone',
        short_name: 'Ethos',
        description: 'A simple incremental civilization game prototype.',
        theme_color: '#101418',
        background_color: '#101418',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.svg',
            sizes: '48x46',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
})
