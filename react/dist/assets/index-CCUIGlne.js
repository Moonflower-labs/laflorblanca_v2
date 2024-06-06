import{G as y,u as x,r as n,a as b,b as w,c as j,d as v,j as e,F as N,L as P,e as S,f as F,p as h}from"./index-CJzJuuVF.js";import{P as T}from"./Pagination-BuE_Kv4E.js";function C(a){return y({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"},child:[]},{tag:"path",attr:{d:"M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"},child:[]}]})(a)}const R=()=>{const{q:a}=x()||{q:null},s=n.useRef(null),r=n.useRef(null),l=b(),o=w(),i=j(),m=v(),g=l.location&&new URLSearchParams(l.location.search).has("search"),u=new URLSearchParams(o.search),d=u.get("favorites")==="on"||u.get("favorites")==="true";let p;const f=(t,c)=>{clearTimeout(p),p=setTimeout(()=>{i(t,{...c,preventScrollReset:!0,replace:!0})},800)};return n.useEffect(()=>{if(r.current){const t=r.current.elements.namedItem("favorites")||null;t.value=d?"false":"true"}},[d]),e.jsxs("div",{className:"flex flex-col md:flex-row justify-between gap-4 align-middle w-[90%] mx-auto pb-4",children:[e.jsxs("div",{className:"flex flex-row gap-4 align-middle",children:[e.jsx(m.Form,{ref:s,onChange:t=>f(t.currentTarget),children:e.jsxs("label",{className:"input input-bordered input-md w-full max-w-xs flex items-center align-middle gap-2",children:[e.jsx("input",{type:"text",className:"w-full",placeholder:"Search",name:"search",id:"search",defaultValue:a||""}),e.jsx(N,{size:24,className:"text-primary"})]})}),e.jsx("div",{"aria-hidden":!0,hidden:!g,children:e.jsx("span",{className:"loading loading-ring loading-lg"})})]}),e.jsxs("div",{className:"dropdown dropdown-bottom my-auto",children:[e.jsxs("div",{tabIndex:0,role:"button",className:"w-full flex gap-4 m-1 text-primary",children:["Filtros",e.jsx(C,{size:24})]}),e.jsx(m.Form,{ref:r,onReset:()=>{var c;const t=new URLSearchParams((c=l.location)==null?void 0:c.search);t.delete("favorites"),t.delete("category"),history.replaceState(null,"",`?${t.toString()}`)},children:e.jsxs("div",{tabIndex:0,className:"dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-72",children:[e.jsx("div",{className:"form-control",children:e.jsxs("label",{className:"cursor-pointer label",children:[e.jsx("span",{className:"label-text",children:"Favoritos"}),e.jsx("input",{type:"checkbox",className:"checkbox checkbox-secondary",name:"favorites",defaultChecked:d,onChange:()=>{i(r.current,{preventScrollReset:!0})}})]})}),e.jsxs("select",{className:"select select-bordered w-full max-w-xs",defaultValue:"Categoría",name:"category",onChange:()=>{i(r.current,{preventScrollReset:!0})},children:[e.jsx("option",{disabled:!0,children:"Categoría"}),e.jsx("option",{value:"luz",children:"Luz"}),e.jsx("option",{value:"chakras",children:"Chakras"})]}),e.jsx("button",{type:"reset",children:"Reset"})]})})]})]})},k=({post:a})=>{var l,o;return e.jsxs("div",{className:"card w-[98%] bg-base-100 shadow-xl",children:[e.jsx("figure",{className:"px-10 pt-10",children:e.jsx("img",{src:"/static/flower.png",alt:"",className:"rounded-xl aspect-video",width:300})}),e.jsxs("div",{className:"card-body",children:[e.jsx("h2",{className:"card-title text-primary mb-5",children:e.jsxs(P,{to:`post/${a.id}`,children:[" ",a.title]})}),e.jsx("div",{className:" divider"}),e.jsxs("div",{className:"text-secondary flex flex-col md:flex-row gap-3",children:[e.jsxs("div",{className:"flex gap-4 text-xl",children:[e.jsx(S,{size:30}),e.jsx("div",{className:"",children:(l=a==null?void 0:a.rating_score)==null?void 0:l.score.toFixed(1)})]}),e.jsxs("div",{className:"flex gap-4 text-xl",children:[e.jsx(F,{size:30}),e.jsx("div",{className:"",children:(o=a.comments)==null?void 0:o.length})]})]})]})]})},A=async({request:a})=>{const s=new URL(a.url),r=s.searchParams.get("search")||"",{data:l}=await h.getAllPosts(s.searchParams)||{data:null};return{data:l,q:r}},Y=async({request:a})=>{const s=await a.formData(),r=s.get("action"),l=s.get("id");return(r==="add"||r==="remove")&&await h.addToFavorites(l,s),null},E=()=>{const{data:a}=x()||{data:null},s=a==null?void 0:a.results;return e.jsxs("div",{className:"text-center pt-5 px-1",children:[e.jsx("div",{className:"pt-10 text-primary text-4xl mb-8 font-semibold",children:"Personalidad"}),e.jsxs("div",{className:"grid grid-cols-1 md:w-1/2 mx-auto mb-4",children:[e.jsx("p",{className:"text-3xl mb-2",children:"¡Bienvenidos Personalidades!"}),e.jsx("iframe",{className:"aspect-video rounded-lg",src:"https://www.youtube-nocookie.com/embed/7158ShreVEU?si=bkwDx8JAqnWtQRuZ",height:"100%",width:"100%",title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;",allowFullScreen:!0,referrerPolicy:"no-referrer",loading:"lazy"})]}),e.jsx("div",{className:"text-center mb-4",children:"Estos son ejemplos de preguntas y sugerencias de temáticas generalizadas por parte de los oyentes."}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-2 mb-6",children:[e.jsxs("div",{className:"flex flex-col m-10",children:[e.jsx("p",{className:"h-10 mb-2",children:"El Mirto o Arrayán y sus usos para el amor"}),e.jsx("iframe",{className:"aspect-video rounded-lg",src:"https://www.youtube-nocookie.com/embed/dKXH2Tdttkg",title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;",allowFullScreen:!0,referrerPolicy:"no-referrer",loading:"lazy"})]}),e.jsxs("div",{className:"flex flex-col m-10",children:[e.jsx("p",{className:"h-10 mb-2",children:"Los Cuatro Elementos 🔥🌬🌊⛰ y sus Colores🎨"}),e.jsx("iframe",{className:"aspect-video rounded-lg",src:"https://www.youtube-nocookie.com/embed/7Pi6W3Xnv5U",title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,referrerPolicy:"no-referrer",loading:"lazy"})]}),e.jsxs("div",{className:"flex flex-col m-10",children:[e.jsx("p",{className:"h-10 mb-2",children:"Triada del Fuego🔥: Aries, Leo y Sagitario"}),e.jsx("iframe",{className:"aspect-video rounded-lg",src:"https://www.youtube-nocookie.com/embed/RqHO0WUlK2Y",title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,referrerPolicy:"no-referrer",loading:"lazy"})]}),e.jsxs("div",{className:"flex flex-col m-10",children:[e.jsx("p",{className:"h-10 mb-2",children:"Triada de la Tierra🌋: Tauro, Virgo y Capricornio"}),e.jsx("iframe",{className:"aspect-video rounded-lg",src:"https://www.youtube-nocookie.com/embed/0b8onmHCsY4",title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,referrerPolicy:"no-referrer",loading:"lazy"})]}),e.jsxs("div",{className:"flex flex-col m-10",children:[e.jsx("p",{className:"h-10 mb-2",children:"Triada del Aire🌬: Géminis, Libra y Acuario"}),e.jsx("iframe",{className:"aspect-video rounded-lg",src:"https://www.youtube-nocookie.com/embed/4-C-0JsUt1I",title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,referrerPolicy:"no-referrer",loading:"lazy"})]}),e.jsxs("div",{className:"flex flex-col m-10",children:[e.jsx("p",{className:"h-10 mb-2",children:"Triada del Agua🌊: Cáncer, Escorpio y Piscis"}),e.jsx("iframe",{className:"aspect-video rounded-lg",src:"https://www.youtube-nocookie.com/embed/XTup4T4vVRw",title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,referrerPolicy:"no-referrer",loading:"lazy"})]}),e.jsxs("div",{className:"flex flex-col m-10",children:[e.jsx("p",{className:"h-10 mb-2",children:"Narcisismo desde el Astral"}),e.jsx("iframe",{className:"aspect-video rounded-lg",src:"https://www.youtube-nocookie.com/embed/re4mncuNTD4",title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,referrerPolicy:"no-referrer",loading:"lazy"})]}),e.jsxs("div",{className:"flex flex-col m-10",children:[e.jsx("p",{className:"h-10 mb-2",children:"Falsos Lectores de Energía y Guía para Detectarlos"}),e.jsx("iframe",{className:"aspect-video rounded-lg",src:"https://www.youtube-nocookie.com/embed/_jLz5sVcC2Y",title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,referrerPolicy:"no-referrer",loading:"lazy"})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:w-1/2 mx-auto mb-10",children:[e.jsx("p",{className:"text-3xl mb-6",children:"Respuestas de audio"}),e.jsx("p",{className:"mb-3",children:'Si quieres ver la pregunta más detallada y completa del episodio dale a "more info".'}),e.jsx("iframe",{className:"aspect-video rounded-lg",height:"390",width:"100%",seamless:!0,src:"https://share.transistor.fm/e/respuestas-personalidad/playlist",referrerPolicy:"no-referrer",loading:"lazy"})]}),e.jsx("p",{className:"text-3xl mb-5",children:"Respuestas de Blog"}),e.jsx(R,{}),s&&s.length?e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-3 justify-items-center pb-4",children:s.map(r=>e.jsx(k,{post:r},r.id))}):e.jsx("div",{className:"text-xl pb-3 text-center",children:"No hay respuestas disponibles"}),e.jsx(T,{totalPages:a==null?void 0:a.total_pages})]})};export{E as Personality,Y as personalityAction,A as personalityLoader};
