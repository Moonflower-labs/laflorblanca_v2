if(!self.define){let s,e={};const i=(i,r)=>(i=new URL(i+".js",r).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(r,n)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let u={};const o=s=>i(s,l),t={module:{uri:l},exports:u,require:o};e[l]=Promise.all(r.map((s=>t[s]||o(s)))).then((s=>(n(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/AuthLayout-BNupiWAD.js",revision:null},{url:"assets/basic-BROYbaGJ.js",revision:null},{url:"assets/favorites-BnTZRxoV.js",revision:null},{url:"assets/help-DarblNeO.js",revision:null},{url:"assets/index-DnXoUNjb.js",revision:null},{url:"assets/index-DYPAHR8C.css",revision:null},{url:"assets/live-Ca9cDcyj.js",revision:null},{url:"assets/login-D3cDqxdG.js",revision:null},{url:"assets/MembersLayout-C0-jdu8P.js",revision:null},{url:"assets/profile-icuxI7yq.js",revision:null},{url:"assets/QuestionLayout-6Y8x7X_d.js",revision:null},{url:"assets/register-8-Iaey6w.js",revision:null},{url:"assets/reset-confirmation-zarxb0Pb.js",revision:null},{url:"assets/reset-password-D_rxfxUL.js",revision:null},{url:"assets/store-SnNuN8Wp.js",revision:null},{url:"assets/subscription-Bj8Z3wu8.js",revision:null},{url:"assets/tarot-WUg91VCE.js",revision:null},{url:"assets/UserProfileLayout-BAhevAy5.js",revision:null},{url:"index.html",revision:"563b234c28875cdf6a56e76820101336"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"flower.png",revision:"3c1bdb5c39eb06dce2418e2113904bf3"},{url:"pwa-64x64.png",revision:"e1a1185c861069b00a96ced2beb65d1c"},{url:"pwa-192x192.png",revision:"ae60ad8fd83c905c517aae62257ae534"},{url:"pwa-512x512.png",revision:"3d3a99276b14768b05cef0da5a447a3f"},{url:"maskable-icon-512x512.png",revision:"e3ebbdeeeb81e12e256f8f8203c2a365"},{url:"manifest.webmanifest",revision:"ea0a6be58c6cabefe32b70e0b2231d4e"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
