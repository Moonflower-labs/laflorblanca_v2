if(!self.define){let s,e={};const i=(i,r)=>(i=new URL(i+".js",r).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(r,n)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let u={};const o=s=>i(s,l),t={module:{uri:l},exports:u,require:o};e[l]=Promise.all(r.map((s=>t[s]||o(s)))).then((s=>(n(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/AuthLayout-BNupiWAD.js",revision:null},{url:"assets/basic-BROYbaGJ.js",revision:null},{url:"assets/favorites-BnTZRxoV.js",revision:null},{url:"assets/help-DarblNeO.js",revision:null},{url:"assets/index-DnXoUNjb.js",revision:null},{url:"assets/index-DYPAHR8C.css",revision:null},{url:"assets/live-Ca9cDcyj.js",revision:null},{url:"assets/login-D3cDqxdG.js",revision:null},{url:"assets/MembersLayout-C0-jdu8P.js",revision:null},{url:"assets/profile-icuxI7yq.js",revision:null},{url:"assets/QuestionLayout-6Y8x7X_d.js",revision:null},{url:"assets/register-8-Iaey6w.js",revision:null},{url:"assets/reset-confirmation-zarxb0Pb.js",revision:null},{url:"assets/reset-password-D_rxfxUL.js",revision:null},{url:"assets/store-SnNuN8Wp.js",revision:null},{url:"assets/subscription-Bj8Z3wu8.js",revision:null},{url:"assets/tarot-WUg91VCE.js",revision:null},{url:"assets/UserProfileLayout-BAhevAy5.js",revision:null},{url:"index.html",revision:"563b234c28875cdf6a56e76820101336"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"d976278abb56ea8a0fdeeaeb881c4d0b"},{url:"apple-touch-icon-180x180.png",revision:"955f33c854b159a5a74c3ad26ad3b3f2"},{url:"pwa-64x64.png",revision:"e2949066bb4c74f2edb6691c1c3c0032"},{url:"pwa-192x192.png",revision:"b43b410cc5a0fc2116e5f73e3e7101de"},{url:"pwa-512x512.png",revision:"23da8a484aa0872ea6e9f1ed8bb74326"},{url:"manifest.webmanifest",revision:"450b515869ffa943e7ba5d3fa5ff6fd9"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
