/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {VitePWA} from "vite-plugin-pwa"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'apple-touch-icon-180x180.png','apple-splash-landscape-2048x1536.png','apple-splash-portrait-1536x2048.png'],
    manifest: {
      name: 'La Flor Blanca',
      short_name: 'La Flor Blanca',
      description: 'Visiones con La Flor Blanca',
      theme_color: '#000000',
      background_color: '#000000',
      
      icons:   [
       
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
          "type": "image/png"
        },
        {
          "src": "apple-touch-icon.png",
          "sizes": "180x180",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "apple-splash-landscape-light-2048x1536.png",
          "sizes": "2048x1536",
          "type": "image/png",
        },
        {
          "src": "apple-splash-portrait-light-1536x2048.png",
          "sizes": "1536x2048",
          "type": "image/png",
          "purpose": "maskable"
        },
      ],
      
    },
    devOptions: {
      enabled: true
    }
  })],

  build: {
    
    manifest: true,
    // rollupOptions: {
    //   assetFileNames: (file) => {
    //     return "assets/css/index.min.css";
    //   },
    //   entryFileNames: (file) => {
    //     return "assets/js/[name].min.js";
    //   },
    // },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup",
  },
});

// (!) Some chunks are larger than 500 kB after minification. Consider:
// - Using dynamic import() to code-split the application
// - Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
// - Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.