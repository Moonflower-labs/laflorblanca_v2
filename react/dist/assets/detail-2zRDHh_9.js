import{v as x,s as p,u,h as j,k as f,j as e,I as h,i as v,f as g}from"./index-CNPLqyP2.js";import{F as k,L as m,i as c,C as N,a as w}from"./helpers-DtwQPPdk.js";import{V as L}from"./VideoComponent-D5vkRMQN.js";const C=async({request:s,params:t})=>{const a=new URL(s.url),o=new URLSearchParams(a.search);o.set("section","soul");const l=await x.getVideo(t.id,o);return{video:(l==null?void 0:l.video)||null}},D=async({request:s,params:t})=>{const a=await s.formData();switch(a.get("intent")){case"like":return await p(a);case"favorite":return await x.addToFavorites(t.id,a);default:throw new Response("",{status:405})}};function R(){var r,d;const{video:s}=u()||{video:null},{user:t}=j("root")||{user:null},a=f(),o=s&&((d=(r=t==null?void 0:t.profile)==null?void 0:r.favorite_videos)==null?void 0:d.some(i=>(s==null?void 0:s.id)!==void 0&&i===(s==null?void 0:s.id))),l=t==null?void 0:t.likes.liked_videos,n=t==null?void 0:t.likes.liked_comments;return e.jsx(e.Fragment,{children:s?e.jsxs(e.Fragment,{children:[e.jsxs("article",{className:"pb-6 pt-16 px-10 md:px-40",children:[e.jsxs("h2",{className:"relative text-primary font-semibold text-2xl text-center mt-4 mb-3",children:[e.jsxs("span",{className:"fixed left-1 top-9 flex flex-row gap-3 align-middle cursor-pointer text-primary",onClick:()=>a("..",{preventScrollReset:!0}),children:[e.jsx(h,{size:24}),"Atrás"]}),s.title]}),e.jsx(L,{link:s}),e.jsx("div",{className:"divider divider-primary md:w-2/3 mx-auto",children:e.jsx("span",{className:"text-primary",children:e.jsx(v,{size:34})})}),e.jsxs("div",{className:"flex flex-col md:flex-row gap-4 align-middle",children:[e.jsx("div",{className:"flex gap-4 align-middle",children:e.jsx(k,{object:s,isFavorite:!!o})}),e.jsx(m,{object:"video",id:s.id,isLiked:c(s.id,l)})]})]}),e.jsxs("h2",{className:"flex gap-4 align-middle text-primary justify-center font-semibold text-2xl mt-4 mb-3",children:["Comentarios ",e.jsx(g,{size:24,className:"my-auto"})]}),e.jsx("div",{className:"md:px-40 mb-6 max-h-44 bg-primary/20 rounded-md mx-4 overflow-y-auto",children:s!=null&&s.comments&&s.comments.length?s.comments.map(i=>e.jsxs("div",{className:"flex flex-row gap-4 align-middles",children:[e.jsx(N,{comment:i}),e.jsx(m,{object:"comment",id:i.id,isLiked:c(i.id,n)})]},i.id)):e.jsx("p",{className:"text-xl text-center",children:"Nadie ha comentado todavía."})}),e.jsx(w,{object:s,fieldName:"video"})]}):e.jsx("div",{className:"text-3xl text-center h-full my-auto",children:"No hemos encontrado el post."})})}export{R as SoulDetail,D as soulDetailAction,C as soulDetailLoader};
