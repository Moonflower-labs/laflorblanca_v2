/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {VitePWA, VitePWAOptions} from "vite-plugin-pwa"


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isProduction = process.env.NODE_ENV === 'production'

const pwaOptions: Partial<VitePWAOptions> = {
  // Service worker strategy conf
  strategies: 'injectManifest',
  srcDir: 'src',
  filename: 'sw.ts',
  injectRegister: 'auto',
  workbox: {
    navigateFallback: null,
    cleanupOutdatedCaches: true,
    sourcemap:true,

  },
  injectManifest: {

    globPatterns: ['**/*.{js,css,html,ico,png,svg,jpeg}'],
    maximumFileSizeToCacheInBytes: 3000000,
    enableWorkboxModulesLogs: true,
    // injectionPoint: undefined
  },

  includeAssets: [
    'favicon.ico', 
    'apple-touch-icon.png', 
    'mask-icon.svg',
  ],
  manifest: {
    name: 'La Flor Blanca',
    short_name: 'La Flor Blanca',
    description: 'Visiones con La Flor Blanca',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    
    "icons": [
      {
        "src": "pwa-64x64.png",
        "sizes": "64x64",
        "type": "image/png"
      },
      {
        "src": "pwa-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "pwa-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
      },
      {
        "src": "pwa-512x512.png",
        "sizes": "512x512",
        "type": "any"
      },
      {
        "src": "maskable-icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
      }
    ]
  },
  devOptions: {
    enabled: true,
    type: 'module',
    navigateFallback: 'index.html',
  },
}

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    react(), 
    VitePWA(pwaOptions)
  ],

  build: {
    manifest: true,
    rollupOptions: {
       output: {  
        // entryFileNames:`[name].[hash].js`,
        // chunkFileNames:`[name].[hash].js`,
        // assetFileNames: `[name].[ext]`,
        //   assetFileNames: (file) => {
        //     return "assets/css/index.min.css";
        //   },
        //   entryFileNames: (file) => {
        //     return "assets/js/[name].min.js";
        //   },
      },
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup",
  },
});