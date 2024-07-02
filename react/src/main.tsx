import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { registerSW } from "virtual:pwa-register";

const intervalMS = 60 * 60 * 1000

const updateSW = registerSW({

  onNeedRefresh() {
    const confirmation = window.confirm('New version avaliable. Refresh now?');
    if (confirmation) {
      updateSW();
    }
  },
  onOfflineReady() {
    window.alert('Applicaton ready to work offline')
  },
  onRegisterError(error) {
    console.log('An error ocurred registering the SW: ', error)
  },
  onRegisteredSW(swUrl, r) {
    r && setInterval(async () => {
      if (r.installing || !navigator)
        return

      if (('connection' in navigator) && !navigator.onLine)
        return

      const resp = await fetch(swUrl, {
        cache: 'no-store',
        headers: {
          'cache': 'no-store',
          'cache-control': 'no-cache',
        },
      })

      if (resp?.status === 200)
        await r.update()
    }, intervalMS)
  }

})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
