import{G as r,x as c,u as d,d as x,j as e,L as i}from"./index-DBHNzPA1.js";function l(s){return r({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M4 7l16 0"},child:[]},{tag:"path",attr:{d:"M10 11l0 6"},child:[]},{tag:"path",attr:{d:"M14 11l0 6"},child:[]},{tag:"path",attr:{d:"M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"},child:[]},{tag:"path",attr:{d:"M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"},child:[]}]})(s)}const h=async()=>{try{return(await c.get("api/user-profile/favorites/")).data}catch(s){return console.log(s),null}},m=()=>{const{favorite_posts:s,favorite_videos:n}=d()||{},a=x();return e.jsxs("div",{className:"px-3 overflow-x-hidden",children:[e.jsxs("section",{className:"py-6",children:[e.jsx("h2",{className:"font-semibold text-2xl text-primary",children:"Posts"}),s!=null&&s.length?s==null?void 0:s.map(t=>e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsx(i,{to:`/personality/post/${t.id}`,className:"link link-accent",children:t.title}),e.jsxs(a.Form,{method:"post",action:`/personality/post/${t.id}`,className:"text-end",children:[e.jsx("input",{type:"hidden",name:"id",value:t.id}),e.jsx("input",{type:"hidden",name:"action",value:"remove"}),e.jsx("input",{type:"hidden",name:"intent",value:"favorite"}),e.jsx("button",{type:"submit",className:"text-accent text-xl",name:"id",value:t.id,children:e.jsx(l,{className:"text-error"})})]})]},t.id)):e.jsx("div",{children:"No tienes ningún favorito"})]}),e.jsxs("section",{className:"py-6",children:[e.jsx("h2",{className:"font-semibold text-2xl text-primary",children:"Videos"}),n!=null&&n.length?n==null?void 0:n.map(t=>e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between",children:[e.jsx(i,{to:`/${t.section}/video/${t.id}`,className:"link link-accent",children:t.title}),e.jsx("div",{className:"flex flex-row",children:e.jsxs("div",{className:"flex flex-row gap-3",children:[(t==null?void 0:t.section)==="soul"?e.jsx("span",{children:"Alma"}):e.jsx("span",{children:"Espíritu"}),e.jsxs(a.Form,{method:"post",action:`/${t.section}/video/${t.id}`,className:"text-end",children:[e.jsx("input",{type:"hidden",name:"id",value:t.id}),e.jsx("input",{type:"hidden",name:"action",value:"remove"}),e.jsx("input",{type:"hidden",name:"intent",value:"favorite"}),e.jsx("button",{type:"submit",className:"text-accent text-xl",name:"id",value:t.id,children:e.jsx(l,{className:"text-error"})})]})]})})]},t.id)):e.jsx("div",{children:"No tienes ningún favorito"})]})]})};export{m as Favorites,h as userFavoriteLoader};
