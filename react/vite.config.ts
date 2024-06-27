/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {VitePWA} from "vite-plugin-pwa"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: [
      'favicon.ico', 
      'apple-touch-icon.png', 
      'mask-icon.svg',
    ],
    manifest: {
      name: 'La Flor Blanca',
      short_name: 'La Flor Blanca',
      description: 'Visiones con La Flor Blanca',
      theme_color: '#000000',
      background_color: '#000000',
     
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
          "type": "image/png"
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