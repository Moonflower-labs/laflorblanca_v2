import{r as d,j as s,w as h,C as p,u as j,D as N,E as g,H as v}from"./index-CNPLqyP2.js";const b=({item:e,addToCart:r})=>{var i,u,x;const[t,c]=d.useState({id:e.prices[0].id,amount:e.prices[0].unit_amount}),m=a=>{const o=a.currentTarget.value,l=a.currentTarget.selectedOptions[0].getAttribute("data-amount");if(l!==null){const n=Number(l);c({id:o,amount:n})}};return s.jsxs("div",{className:"card w-96 glass mx-auto shadow-lg",children:[s.jsx("figure",{className:"px-10 pt-10",children:s.jsx("img",{src:(i=e==null?void 0:e.product)==null?void 0:i.images[0],alt:"",className:"aspect-square rounded-xl"})}),s.jsxs("div",{className:"card-body",children:[s.jsx("h2",{className:"card-title",children:(u=e==null?void 0:e.product)==null?void 0:u.name}),s.jsx("p",{children:(x=e==null?void 0:e.product)==null?void 0:x.description}),s.jsxs("div",{className:"card-actions justify-center",children:[s.jsxs("label",{className:"form-control w-full max-w-xs",children:[s.jsxs("div",{className:"label",children:[s.jsx("span",{className:"label-text",children:"Elige uno"}),s.jsx("span",{className:"label-text-alt",children:"Alt label"})]}),s.jsx("select",{className:"select select-bordered mb-3",onChange:m,children:(e==null?void 0:e.prices)&&e.prices.map(a=>{var o,l,n;return s.jsxs("option",{value:a.id,"data-amount":a.unit_amount,children:[(o=a.metadata)==null?void 0:o.title," ",(l=a.metadata)==null?void 0:l.size," ",(n=a.metadata)==null?void 0:n.color," £",a.unit_amount/100]},a.id)})})]}),s.jsx("button",{className:"btn btn-primary",onClick:()=>r(e,t),children:"Añadir a la cesta"})]})]})]})},w=()=>s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center pb-4",children:[...Array(10)].map((e,r)=>s.jsxs("div",{className:"flex flex-col gap-4 w-96 my-3 border-2 p-10 rounded-xl",children:[s.jsx("div",{className:"skeleton h-40 w-full"}),s.jsx("div",{className:"skeleton h-6 w-28"}),s.jsx("div",{className:"skeleton h-4 w-full"}),s.jsx("div",{className:"skeleton h-4 w-full"}),s.jsx("div",{className:"skeleton h-4 w-full"}),s.jsx("div",{className:"skeleton h-4 w-full"}),s.jsx("div",{className:"skeleton h-4 w-full"}),s.jsx("div",{className:"skeleton h-12 w-1/2 mx-auto"})]},r))}),y=()=>h.get("products/").then(e=>{const r=e.data;return p({products:r})}).catch(e=>(console.error(e),null)),A=({request:e})=>{e.method==="post"&&console.log("post")},P=()=>{const{products:e}=j()??{products:null},{addToCart:r}=N();return s.jsxs(s.Fragment,{children:[s.jsx("h2",{className:"text-3xl text-center text-primary font-semibold pt-3 mb-4",children:"Tienda"}),!g.isAuthenticated&&s.jsxs("div",{role:"alert",className:"alert bg-warning/60 b mb-4 w-fit mx-auto",children:[s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",className:"stroke-black shrink-0 w-6 h-6",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),s.jsxs("span",{children:["Si estás suscrito a cualquier plan de"," ",s.jsx("span",{className:"text-primary",children:"La Flor Blanca"}),", asegúrate de iniciar sesión para aprovecharte de los precios de miembros."," "]})]}),s.jsx(d.Suspense,{fallback:s.jsx(w,{}),children:s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center pb-4",children:s.jsx(v,{resolve:d.useMemo(()=>new Promise(t=>{setTimeout(()=>{t(e)},600)}),[e]),errorElement:s.jsx("p",{className:"text-error text-xl text-center",children:"⚠️ Error cargando los productos!"}),children:t=>t?t.map(c=>s.jsx(b,{item:c,addToCart:r},c.product.id)):s.jsx("div",{className:"text-2xl text-center mx-auto col-span-full",children:"No hay productos que mostrar"})})})})]})};export{P as Store,A as storeAction,y as storeLoader};
