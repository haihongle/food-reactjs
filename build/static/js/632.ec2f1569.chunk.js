"use strict";(self.webpackChunkfoodstorecms=self.webpackChunkfoodstorecms||[]).push([[632],{4964:(e,t,s)=>{s.r(t),s.d(t,{default:()=>c});var a=s(5043),d=s(3888),n=s(7459),i=(s(3280),s(7836)),l=s(3843),o=(s(9280),s(6747)),u=s(579);const c=function(){const[e,t]=(0,a.useState)([]),[s,c]=(0,a.useState)(10),[r,p]=(0,a.useState)(null),[m,f]=(JSON.parse(localStorage.getItem("user")),(0,a.useState)({page:0,size:10}));(0,a.useEffect)((()=>{g()}),[m]);const g=async()=>{await n.A.get(d.A.getList,m,(e=>{t(e),c(Math.ceil(e.length/m.size))}))};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(o.A,{title:"Add new customer",properties:[{field:"Name",type:"input"},{field:"Age",type:"input-number"},{field:"Email",type:"input"},{field:"Address",type:"input"}],modalID:"problemModal",submitFunction:e=>(async e=>{await n.A.add(d.A.addNew,e,g)})(e)}),(0,u.jsx)(l.A,{pageCount:s,paginateFunction:e=>{let{selected:t}=e;f({page:t,size:10})},modalID:"#problemModal",buttonName:"Add problems"}),(0,u.jsx)("div",{className:"card-body",children:(0,u.jsx)(i.A,{data:e})})]})}}}]);
//# sourceMappingURL=632.ec2f1569.chunk.js.map