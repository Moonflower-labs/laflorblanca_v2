import{f as i,j as t,N as s,A as r,O as o}from"./index-AknObfPh.js";const n=()=>{const a=i().pathname==="/user-profile";return t.jsxs("div",{className:"w-screen md:w-[75%] mx-auto",children:[t.jsx("h1",{className:"text-2xl text-center text-primary font-semibold pt-3",children:"Mi Perfil"}),t.jsxs("div",{role:"tablist",className:"tabs tabs-bordered",children:[t.jsx(s,{to:"/user-profile",role:"tab",className:({isActive:e})=>`tab ${e&&a?"tab-active":""} `,children:"Overview"}),t.jsx(s,{to:"favorites",role:"tab",className:({isActive:e})=>`tab ${e?"tab-active":""} `,children:"Mis favoritos"}),t.jsx(s,{to:"subscription",role:"tab",className:({isActive:e})=>`tab ${e?"tab-active":""} `,children:"Suscripción"})]}),t.jsx(r,{children:t.jsx(o,{})})]})};export{n as Component};
