import{t as n,u as c,j as s,L as a,x as l,y as o,O as d}from"./index-CZ7_xKSa.js";const h=async()=>{try{return(await n.get("api/user-profile/")).data[0]}catch(e){return console.error(e),null}},m=async({request:e})=>await e.formData(),j=()=>{var t,r,i;const e=c();return console.log(e),s.jsxs("div",{className:"max-w-screen-md mx-auto",children:[s.jsx("h1",{className:"text-3xl text-center text-primary font-semibold pt-3",children:"Mi Perfil"}),s.jsxs("div",{role:"tablist",className:"tabs tabs-lifted",children:[s.jsx(a,{to:"/",role:"tab",className:"tab",children:"Overview"}),s.jsx(a,{to:"favorites",role:"tab",className:"tab",children:"Mis favoritos"}),s.jsx(a,{to:"subscription",role:"tab",className:"tab",children:"Suscripción"})]}),e?s.jsx(s.Fragment,{children:(e==null?void 0:e.membership)&&s.jsx(s.Fragment,{children:s.jsx("div",{className:"overflow-x-auto mt-8",children:s.jsxs("table",{className:"table",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"Suscripción"}),s.jsx("th",{children:"Plan"}),s.jsx("th",{children:"Estado"}),s.jsx("th",{children:"Acciones"})]})}),s.jsx("tbody",{children:s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx("div",{className:"flex items-center gap-3",children:s.jsx("div",{children:s.jsx("div",{className:"font-bold",children:"Hart Hagerty"})})})}),s.jsx("td",{children:(r=(t=e==null?void 0:e.membership)==null?void 0:t.plan)==null?void 0:r.name}),s.jsx("td",{children:((i=e==null?void 0:e.membership)==null?void 0:i.status)==="active"?s.jsx(l,{size:20,title:"Activa",className:"text-success mx-auto"}):s.jsx(o,{size:20,title:"Inactiva",className:"text-warning mx-auto"})}),s.jsx("th",{children:s.jsx("button",{className:"btn btn-outline btn-primary btn-xs",children:"Cambiar plan"})})]})})]})})})}):s.jsx("div",{children:"No hemos encontrado tu perfil"}),s.jsx(d,{})]})};export{j as UserProfile,m as userProfileAction,h as userProfileLoader};