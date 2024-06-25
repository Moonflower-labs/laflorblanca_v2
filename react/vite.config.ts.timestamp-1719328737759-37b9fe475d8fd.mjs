// vite.config.ts
import { defineConfig } from "file:///Users/admin/Desktop/flor_blanca_v2/react/node_modules/vite/dist/node/index.js";
import react from "file:///Users/admin/Desktop/flor_blanca_v2/react/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///Users/admin/Desktop/flor_blanca_v2/react/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react(), VitePWA({
    registerType: "autoUpdate",
    includeAssets: ["favicon.ico", "apple-touch-icon.png", "apple-touch-icon-180x180.png", "mask-icon.png"],
    manifest: {
      name: "La Flor Blanca",
      short_name: "FlorBlanca",
      description: "Visiones con La Flor Blanca",
      theme_color: "#000000",
      background_color: "#000000",
      icons: [
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWRtaW4vRGVza3RvcC9mbG9yX2JsYW5jYV92Mi9yZWFjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FkbWluL0Rlc2t0b3AvZmxvcl9ibGFuY2FfdjIvcmVhY3Qvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FkbWluL0Rlc2t0b3AvZmxvcl9ibGFuY2FfdjIvcmVhY3Qvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHtWaXRlUFdBfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCJcblxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIFZpdGVQV0Eoe1xuICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxuICAgIGluY2x1ZGVBc3NldHM6IFsnZmF2aWNvbi5pY28nLCAnYXBwbGUtdG91Y2gtaWNvbi5wbmcnLCAnYXBwbGUtdG91Y2gtaWNvbi0xODB4MTgwLnBuZycsJ21hc2staWNvbi5wbmcnXSxcbiAgICBtYW5pZmVzdDoge1xuICAgICAgbmFtZTogJ0xhIEZsb3IgQmxhbmNhJyxcbiAgICAgIHNob3J0X25hbWU6ICdGbG9yQmxhbmNhJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVmlzaW9uZXMgY29uIExhIEZsb3IgQmxhbmNhJyxcbiAgICAgIHRoZW1lX2NvbG9yOiAnIzAwMDAwMCcsXG4gICAgICBiYWNrZ3JvdW5kX2NvbG9yOiAnIzAwMDAwMCcsXG4gICAgICBpY29uczogICBbXG4gICAgICAgXG4gICAgICAgIHtcbiAgICAgICAgICBcInNyY1wiOiBcInB3YS02NHg2NC5wbmdcIixcbiAgICAgICAgICBcInNpemVzXCI6IFwiNjR4NjRcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJzcmNcIjogXCJwd2EtMTkyeDE5Mi5wbmdcIixcbiAgICAgICAgICBcInNpemVzXCI6IFwiMTkyeDE5MlwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInNyY1wiOiBcInB3YS01MTJ4NTEyLnBuZ1wiLFxuICAgICAgICAgIFwic2l6ZXNcIjogXCI1MTJ4NTEyXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwic3JjXCI6IFwiYXBwbGUtdG91Y2gtaWNvbi5wbmdcIixcbiAgICAgICAgICBcInNpemVzXCI6IFwiMTgweDE4MFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgIFwicHVycG9zZVwiOiBcIm1hc2thYmxlXCJcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBkZXZPcHRpb25zOiB7XG4gICAgICBlbmFibGVkOiB0cnVlXG4gICAgfVxuICB9KV0sXG5cbiAgYnVpbGQ6IHtcbiAgICBcbiAgICBtYW5pZmVzdDogdHJ1ZSxcbiAgICAvLyByb2xsdXBPcHRpb25zOiB7XG4gICAgLy8gICBhc3NldEZpbGVOYW1lczogKGZpbGUpID0+IHtcbiAgICAvLyAgICAgcmV0dXJuIFwiYXNzZXRzL2Nzcy9pbmRleC5taW4uY3NzXCI7XG4gICAgLy8gICB9LFxuICAgIC8vICAgZW50cnlGaWxlTmFtZXM6IChmaWxlKSA9PiB7XG4gICAgLy8gICAgIHJldHVybiBcImFzc2V0cy9qcy9bbmFtZV0ubWluLmpzXCI7XG4gICAgLy8gICB9LFxuICAgIC8vIH0sXG4gIH0sXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiBcImpzZG9tXCIsXG4gICAgc2V0dXBGaWxlczogXCIuL3Rlc3RzL3NldHVwXCIsXG4gIH0sXG59KTtcblxuLy8gKCEpIFNvbWUgY2h1bmtzIGFyZSBsYXJnZXIgdGhhbiA1MDAga0IgYWZ0ZXIgbWluaWZpY2F0aW9uLiBDb25zaWRlcjpcbi8vIC0gVXNpbmcgZHluYW1pYyBpbXBvcnQoKSB0byBjb2RlLXNwbGl0IHRoZSBhcHBsaWNhdGlvblxuLy8gLSBVc2UgYnVpbGQucm9sbHVwT3B0aW9ucy5vdXRwdXQubWFudWFsQ2h1bmtzIHRvIGltcHJvdmUgY2h1bmtpbmc6IGh0dHBzOi8vcm9sbHVwanMub3JnL2NvbmZpZ3VyYXRpb24tb3B0aW9ucy8jb3V0cHV0LW1hbnVhbGNodW5rc1xuLy8gLSBBZGp1c3QgY2h1bmsgc2l6ZSBsaW1pdCBmb3IgdGhpcyB3YXJuaW5nIHZpYSBidWlsZC5jaHVua1NpemVXYXJuaW5nTGltaXQuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixTQUFRLGVBQWM7QUFJdEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxRQUFRO0FBQUEsSUFDekIsY0FBYztBQUFBLElBQ2QsZUFBZSxDQUFDLGVBQWUsd0JBQXdCLGdDQUErQixlQUFlO0FBQUEsSUFDckcsVUFBVTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2Isa0JBQWtCO0FBQUEsTUFDbEIsT0FBUztBQUFBLFFBRVA7QUFBQSxVQUNFLE9BQU87QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxRQUNWO0FBQUEsUUFDQTtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFFBQ1Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxPQUFPO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxRQUFRO0FBQUEsUUFDVjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE9BQU87QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFlBQVk7QUFBQSxNQUNWLFNBQVM7QUFBQSxJQUNYO0FBQUEsRUFDRixDQUFDLENBQUM7QUFBQSxFQUVGLE9BQU87QUFBQSxJQUVMLFVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFTWjtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsWUFBWTtBQUFBLEVBQ2Q7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
