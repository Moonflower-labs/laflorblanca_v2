// vite.config.ts
import { defineConfig } from "file:///Users/admin/Desktop/flor_blanca_v2/react/node_modules/vite/dist/node/index.js";
import react from "file:///Users/admin/Desktop/flor_blanca_v2/react/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///Users/admin/Desktop/flor_blanca_v2/react/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react(), VitePWA({
    registerType: "autoUpdate",
    includeAssets: [
      "favicon.ico",
      "apple-touch-icon.png",
      "mask-icon.svg"
    ],
    manifest: {
      name: "La Flor Blanca",
      short_name: "La Flor Blanca",
      description: "Visiones con La Flor Blanca",
      theme_color: "#000000",
      background_color: "#000000",
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
    manifest: true
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
    setupFiles: "./tests/setup"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWRtaW4vRGVza3RvcC9mbG9yX2JsYW5jYV92Mi9yZWFjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FkbWluL0Rlc2t0b3AvZmxvcl9ibGFuY2FfdjIvcmVhY3Qvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FkbWluL0Rlc2t0b3AvZmxvcl9ibGFuY2FfdjIvcmVhY3Qvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHtWaXRlUFdBfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCJcblxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIFZpdGVQV0Eoe1xuICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxuICAgIGluY2x1ZGVBc3NldHM6IFtcbiAgICAgICdmYXZpY29uLmljbycsIFxuICAgICAgJ2FwcGxlLXRvdWNoLWljb24ucG5nJywgXG4gICAgICAnbWFzay1pY29uLnN2ZycsXG4gICAgXSxcbiAgICBtYW5pZmVzdDoge1xuICAgICAgbmFtZTogJ0xhIEZsb3IgQmxhbmNhJyxcbiAgICAgIHNob3J0X25hbWU6ICdMYSBGbG9yIEJsYW5jYScsXG4gICAgICBkZXNjcmlwdGlvbjogJ1Zpc2lvbmVzIGNvbiBMYSBGbG9yIEJsYW5jYScsXG4gICAgICB0aGVtZV9jb2xvcjogJyMwMDAwMDAnLFxuICAgICAgYmFja2dyb3VuZF9jb2xvcjogJyMwMDAwMDAnLFxuICAgICBcbiAgICAgIFwiaWNvbnNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJzcmNcIjogXCJwd2EtNjR4NjQucG5nXCIsXG4gICAgICAgICAgXCJzaXplc1wiOiBcIjY0eDY0XCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwic3JjXCI6IFwicHdhLTE5MngxOTIucG5nXCIsXG4gICAgICAgICAgXCJzaXplc1wiOiBcIjE5MngxOTJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJzcmNcIjogXCJwd2EtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICBcInNpemVzXCI6IFwiNTEyeDUxMlwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInNyY1wiOiBcIm1hc2thYmxlLWljb24tNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICBcInNpemVzXCI6IFwiNTEyeDUxMlwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgIFwicHVycG9zZVwiOiBcIm1hc2thYmxlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgICAgXG4gICAgfSxcbiAgICBkZXZPcHRpb25zOiB7XG4gICAgICBlbmFibGVkOiB0cnVlXG4gICAgfVxuICB9KV0sXG5cbiAgYnVpbGQ6IHtcbiAgICBcbiAgICBtYW5pZmVzdDogdHJ1ZSxcbiAgICAvLyByb2xsdXBPcHRpb25zOiB7XG4gICAgLy8gICBhc3NldEZpbGVOYW1lczogKGZpbGUpID0+IHtcbiAgICAvLyAgICAgcmV0dXJuIFwiYXNzZXRzL2Nzcy9pbmRleC5taW4uY3NzXCI7XG4gICAgLy8gICB9LFxuICAgIC8vICAgZW50cnlGaWxlTmFtZXM6IChmaWxlKSA9PiB7XG4gICAgLy8gICAgIHJldHVybiBcImFzc2V0cy9qcy9bbmFtZV0ubWluLmpzXCI7XG4gICAgLy8gICB9LFxuICAgIC8vIH0sXG4gIH0sXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiBcImpzZG9tXCIsXG4gICAgc2V0dXBGaWxlczogXCIuL3Rlc3RzL3NldHVwXCIsXG4gIH0sXG59KTtcblxuLy8gKCEpIFNvbWUgY2h1bmtzIGFyZSBsYXJnZXIgdGhhbiA1MDAga0IgYWZ0ZXIgbWluaWZpY2F0aW9uLiBDb25zaWRlcjpcbi8vIC0gVXNpbmcgZHluYW1pYyBpbXBvcnQoKSB0byBjb2RlLXNwbGl0IHRoZSBhcHBsaWNhdGlvblxuLy8gLSBVc2UgYnVpbGQucm9sbHVwT3B0aW9ucy5vdXRwdXQubWFudWFsQ2h1bmtzIHRvIGltcHJvdmUgY2h1bmtpbmc6IGh0dHBzOi8vcm9sbHVwanMub3JnL2NvbmZpZ3VyYXRpb24tb3B0aW9ucy8jb3V0cHV0LW1hbnVhbGNodW5rc1xuLy8gLSBBZGp1c3QgY2h1bmsgc2l6ZSBsaW1pdCBmb3IgdGhpcyB3YXJuaW5nIHZpYSBidWlsZC5jaHVua1NpemVXYXJuaW5nTGltaXQuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixTQUFRLGVBQWM7QUFJdEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxRQUFRO0FBQUEsSUFDekIsY0FBYztBQUFBLElBQ2QsZUFBZTtBQUFBLE1BQ2I7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxNQUNiLGtCQUFrQjtBQUFBLE1BRWxCLFNBQVM7QUFBQSxRQUNQO0FBQUEsVUFDRSxPQUFPO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxRQUFRO0FBQUEsUUFDVjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE9BQU87QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxRQUNWO0FBQUEsUUFDQTtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFFBQ1Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxPQUFPO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLE1BQ0Y7QUFBQSxJQUVGO0FBQUEsSUFDQSxZQUFZO0FBQUEsTUFDVixTQUFTO0FBQUEsSUFDWDtBQUFBLEVBQ0YsQ0FBQyxDQUFDO0FBQUEsRUFFRixPQUFPO0FBQUEsSUFFTCxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBU1o7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFlBQVk7QUFBQSxFQUNkO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
