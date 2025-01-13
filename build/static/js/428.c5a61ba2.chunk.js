"use strict";(self.webpackChunkfoodstorecms=self.webpackChunkfoodstorecms||[]).push([[428],{8488:(e,t,a)=>{a.d(t,{A:()=>l});var s=a(6213);const n=new(a(4750).A),c=s.A.create({baseURL:"http://localhost:8080/api/v1",headers:{"Content-type":"application/json"}});c.interceptors.request.use((e=>{const t=n.get("token");return t&&(e.headers.Authorization="Bearer ".concat(t)),e}),(e=>Promise.reject(e))),c.interceptors.response.use((e=>e),(e=>{var t,a;const s=(null===(t=e.response)||void 0===t||null===(a=t.data)||void 0===a?void 0:a.err)||"An unknown error occurred";return Promise.reject(s)}));const l=c},3843:(e,t,a)=>{a.d(t,{A:()=>c});var s=a(4527),n=a(579);const c=function(e){let{pageCount:t,paginateFunction:a,modalID:c,buttonName:l}=e;return(0,n.jsxs)("div",{className:"card-header d-flex ".concat(l?" justify-content-between":" justify-content-end"),children:[l&&(0,n.jsx)("div",{children:(0,n.jsx)("button",{type:"button",className:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":c,children:l})}),t>0&&(0,n.jsx)(s.A,{pageCount:t,handlePageClick:a})]})}},9280:(e,t,a)=>{a.d(t,{A:()=>m});var s=a(5043),n=a(3892),c=a(3280),l=a(4571),o=a(4086),r=a(579);function i(e){const t=e.replace(/([a-z])([A-Z])/g,"$1 $2").toLowerCase();return t.charAt(0).toUpperCase()+t.slice(1)}const d=e=>c.Ik().shape(e?Object.keys(e).reduce(((t,a)=>{const s=e[a];return null===s||("string"===typeof s?t[a]=c.Yj().required("Required"):"number"===typeof s?t[a]=c.ai().required("Required").positive("Invalid!"):Array.isArray(s)?s.length>0&&"object"===typeof s[0]&&(t[a]=c.YO().of(d(s[0])).required("Required")):"boolean"===typeof s&&(t[a]=c.zM().required("Required"))),t}),{}):{});const m=function(e){let{detailData:t,actions:a,hiddenFields:c=[]}=e;const[m,u]=(0,s.useState)(null),[h,p]=(0,s.useState)(!1),[x,b]=(0,s.useState)(0);(0,s.useEffect)((()=>{if(t){let e=0;const a={},s={};for(const l in t){const n=t[l];Array.isArray(n)&&n.length>0?(s[l]=n,n.forEach((t=>{if("object"===typeof t&&null!==t){const a=Object.keys(t).length;a>e&&(e=a)}}))):a[l]=n}const n={...a,...s},c=(0,l.A)(n);u(c),b(e)}}),[t]),(0,s.useEffect)((()=>{if(t){new window.bootstrap.Modal(document.getElementById("detailModal")).show();const e=()=>{p(!1)},t=document.getElementById("detailModal");return t.addEventListener("hidden.bs.modal",e),()=>{t.removeEventListener("hidden.bs.modal",e)}}}),[t]);const j=m?Object.keys(m).reduce(((e,t)=>(Array.isArray(m[t])?e[t]=m[t].map((e=>(0,l.A)(e))):e[t]=null!==m[t]&&void 0!==m[t]?m[t]:"",e)),{}):{};return(0,r.jsx)("div",{className:"modal fade",id:"detailModal","data-bs-backdrop":"static",children:(0,r.jsx)("div",{className:"modal-dialog ".concat((g=x,0===g?"modal-lg":g<5?"modal-xl":o.A["modal-xxl"])),children:(0,r.jsxs)("div",{className:"modal-content",children:[(0,r.jsxs)("div",{className:"modal-header",children:[(0,r.jsx)("h5",{className:"modal-title",children:"Details"}),(0,r.jsx)("button",{className:"btn btn-sm btn-danger","data-bs-dismiss":"modal",children:"X"})]}),(0,r.jsx)("div",{className:"modal-body",children:m&&(0,r.jsx)(n.l1,{initialValues:j,validationSchema:d(m),enableReinitialize:!0,onSubmit:async e=>{await a.update(e),p(!1)},children:e=>{let{handleSubmit:t,resetForm:s}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.lV,{children:(0,r.jsx)("div",{className:"row gx-4 gy-3 ps-2 pe-2 pb-4",children:Object.keys(m).map((e=>((e,t,a,s)=>s.includes(e)?null:"string"===typeof t?(0,r.jsx)("div",{className:"col-md-4",children:(0,r.jsxs)("div",{className:o.A["input-container"],children:[(0,r.jsx)("label",{className:o.A["input-label"],htmlFor:e,children:i(e)}),(0,r.jsx)(n.D0,{name:e,type:"text",className:o.A["input-field"],disabled:!a}),(0,r.jsx)(n.Kw,{name:e,component:"div",className:o.A["input-error"]})]})},e):"number"===typeof t?(0,r.jsx)("div",{className:"col-md-4",children:(0,r.jsxs)("div",{className:o.A["input-container"],children:[(0,r.jsx)("label",{className:o.A["input-label"],htmlFor:e,children:i(e)}),(0,r.jsx)(n.D0,{name:e,type:"number",className:o.A["input-field"],disabled:!a}),(0,r.jsx)(n.Kw,{name:e,component:"div",className:o.A["input-error"]})]})},e):Array.isArray(t)?(0,r.jsx)("div",{className:"table-responsive",children:t.length>0&&(0,r.jsx)("div",{className:"col-12 table-responsive",children:(0,r.jsxs)("table",{className:o.A.tableContainer,children:[(0,r.jsx)("thead",{children:(0,r.jsx)("tr",{children:Object.keys(t[0]).map(((e,t)=>s.includes(e)?null:(0,r.jsx)("th",{children:i(e)},t)))})}),(0,r.jsx)("tbody",{children:t.map(((t,c)=>(0,r.jsx)("tr",{children:Object.keys(t).map(((l,i)=>{if(s.includes(l))return null;const d="boolean"===typeof t[l]?"checkbox":"text";return(0,r.jsxs)("td",{children:[(0,r.jsx)(n.D0,{name:"".concat(e,".").concat(c,".").concat(l),type:d,className:"form-control",disabled:!a||"checkbox"===d}),(0,r.jsx)(n.Kw,{name:"".concat(e,".").concat(c,".").concat(l),component:"div",className:o.A["input-error"]})]},i)}))},c)))})]})})},e):"boolean"===typeof t?(0,r.jsxs)("div",{className:"col-md-4 d-flex align-items-center",children:[(0,r.jsx)("label",{className:o.A["input-checkbox"],children:i(e)}),(0,r.jsx)(n.D0,{type:"checkbox",name:e,className:o.A["custom-checkbox"],disabled:!a}),(0,r.jsx)(n.Kw,{name:e,component:"div",className:o.A["input-error"]})]},e):null)(e,m[e],h,c)))})}),(0,r.jsxs)("div",{className:"modal-footer",children:[h&&(0,r.jsx)("button",{className:"btn btn-primary",onClick:t,children:"Update"}),a&&(0,r.jsx)("button",{className:"".concat(h?"btn-danger":"btn-secondary"," btn"),onClick:()=>(e=>{h&&e(),p(!h)})(s),children:h?"Cancel":"Edit"})]})]})}})})]})})});var g}},6747:(e,t,a)=>{a.d(t,{A:()=>h});a(5043);var s=a(3892),n=a(3280),c=a(7943),l=(a(9191),a(4086)),o=a(1899),r=a.n(o),i=(a(5015),a(579));const d=(e,t,a,n)=>(0,i.jsx)(s.ED,{name:a,children:s=>{let{remove:c}=s;return(0,i.jsx)("div",{className:"table-responsive",children:(0,i.jsxs)("table",{className:l.A.tableContainer,children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[t.map(((e,t)=>{let{label:a}=e;return(0,i.jsx)("th",{children:a},t)})),(0,i.jsx)("th",{children:"Action"})]})}),(0,i.jsx)("tbody",{children:e[a].map(((e,s)=>m(e,s,t,c,a,n)))})]})})}}),m=(e,t,a,n,l,o)=>(0,i.jsxs)("tr",{children:[a.map((e=>{let{field:a,type:n,options:c,label:r}=e;return(0,i.jsxs)("td",{children:[u(a,t,{type:n,label:r,options:c},l,o),(0,i.jsx)(s.Kw,{name:"".concat(l,"[").concat(t,"].").concat(a),component:"div",className:"text-danger"})]},"".concat(t,"-").concat(a))})),(0,i.jsxs)("td",{className:"text-center",children:[(0,i.jsx)("i",{className:"fa-solid text-danger fa-circle-minus fs-5 cms_normal-hover","data-tooltip-id":"removeRow-tooltip","data-tooltip-content":"Remove row","data-tooltip-delay-show":"50","data-tooltip-place":"right-start",onClick:()=>n(t)}),(0,i.jsx)(c.m_,{id:"removeRow-tooltip"})]})]},t),u=(e,t,a,n,c)=>{const{type:l,label:o,options:d}=a;switch(l){case"select":return(0,i.jsx)(s.D0,{name:"".concat(n,"[").concat(t,"].").concat(e),children:e=>{let{field:t}=e;return(0,i.jsxs)("select",{...t,className:"form-select",children:[(0,i.jsxs)("option",{value:"",disabled:!0,children:["Select ",o]}),d&&d.length>0?d.map((e=>(0,i.jsx)("option",{value:e.value,children:e.label},e.value))):(0,i.jsx)("option",{value:"",children:"No options availabel"})]})}});case"checkbox":return(0,i.jsx)(s.D0,{name:"".concat(n,"[").concat(t,"].").concat(e),children:e=>{let{field:t}=e;return(0,i.jsxs)("div",{children:[(0,i.jsx)("input",{type:"checkbox",...t,className:"form-check-input"}),(0,i.jsx)("label",{className:"form-check-label",children:o})]})}});case"date":return(0,i.jsx)(s.D0,{name:"".concat(n,"[").concat(t,"].").concat(e),children:e=>{let{field:{name:t,value:a}}=e;return(0,i.jsx)(r(),{selected:a,onChange:e=>c(t,e),dateFormat:"dd/MM/yyyy",className:"form-control",autoComplete:"off"})}});case"number":return(0,i.jsx)(s.D0,{name:"".concat(n,"[").concat(t,"].").concat(e),type:"number",className:"form-control"});case"time":return(0,i.jsx)(s.D0,{name:"".concat(n,"[").concat(t,"].").concat(e),type:"number",className:"form-control",autoComplete:"off"});case"text":return(0,i.jsx)(s.D0,{name:"".concat(n,"[").concat(t,"].").concat(e),type:"text",className:"form-control"});default:return(0,i.jsx)(i.Fragment,{children:"Invalid input field"})}},h=e=>{let{title:t,properties:a=[],detailProperties:c=[],modalID:o,submitFunction:r,tableFieldName:m="tableField"}=e;const u=function(){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],t=arguments.length>2?arguments[2]:void 0;const a=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).reduce(((e,t)=>{let{field:a,validation:s}=t;return e[a]=s,e}),{});return e.length>0&&(a[t]=n.YO().of(n.Ik().shape(e.reduce(((e,t)=>{let{field:a,validation:s}=t;return e[a]=s,e}),{})))),n.Ik().shape(a)}(a,c,m),h=c.length;return(0,i.jsx)(i.Fragment,{children:a.length>0?(0,i.jsx)("div",{className:"modal fade","data-bs-backdrop":"static",id:o,children:(0,i.jsx)("div",{className:"modal-dialog ".concat((p=h,0===p?"modal-lg":p<5?"modal-xl":l.A["modal-xxl"])),children:(0,i.jsxs)("div",{className:"modal-content",children:[(0,i.jsx)("div",{className:"modal-header",children:(0,i.jsx)("h5",{className:"modal-title",children:t})}),(0,i.jsx)("div",{className:"modal-body",children:(0,i.jsx)(s.l1,{initialValues:{...a.reduce(((e,t)=>{let{field:a,initialValue:s}=t;return e[a]=s||"",e}),{}),[m]:[]},validationSchema:u,enableReinitialize:!0,onSubmit:async(e,t)=>{let{setSubmitting:a,resetForm:s}=t;await r(e)&&s(),a(!1)},children:e=>{let{isSubmitting:t,values:n,setFieldValue:o,resetForm:r}=e;return(0,i.jsxs)(s.lV,{children:[(0,i.jsx)("div",{className:"row gy-2 pt-2 pb-2",children:a.map(((e,t)=>{let{label:a,field:n,type:c,className:o,options:r}=e;return(0,i.jsxs)("div",{className:o||"col-12",children:[(0,i.jsxs)("div",{className:"".concat(l.A["input-container"]),children:[(0,i.jsx)("label",{htmlFor:n,className:"".concat(l.A["input-label"]),children:a}),"select"===c&&(0,i.jsxs)(s.D0,{name:n,as:"select",className:"".concat(l.A["input-field"]),children:[(0,i.jsxs)("option",{value:"",disabled:!0,children:["Select ",a]}),r&&r.map((e=>(0,i.jsx)("option",{value:e.value,children:e.label},e.value)))]}),"text-area"===c&&(0,i.jsx)(s.D0,{name:n,as:"textarea",className:"".concat(l.A["input-field"]),autoComplete:"off"}),"select"!==c&&"text-area"!==c&&(0,i.jsx)(s.D0,{name:n,type:c,className:"".concat(l.A["input-field"]),autoComplete:"off"})]}),(0,i.jsx)(s.Kw,{name:n,component:"div",className:"".concat(l.A["input-error"])})]},t)}))}),c&&c.length>0&&d(n,c,m,o),(0,i.jsxs)("div",{className:"modal-footer mt-2",children:[c&&c.length>0&&(0,i.jsx)(s.ED,{name:m,children:e=>{let{push:t}=e;return(0,i.jsx)("button",{type:"button",className:"btn btn-secondary",onClick:()=>t(c.reduce(((e,t)=>{let{field:a,initialValue:s}=t;return e[a]=s||"",e}),{})),children:"Add Row"})}}),(0,i.jsx)("button",{type:"submit",className:"btn btn-primary",disabled:t,children:t?(0,i.jsx)("span",{className:"spinner-border spinner-border-sm"}):"Submit"}),(0,i.jsx)("button",{type:"button",className:"btn btn-danger","data-bs-dismiss":"modal",onClick:r,children:"Cancel"})]})]})}})})]})})}):(0,i.jsx)("p",{children:"No properties availabel"})});var p}},4527:(e,t,a)=>{a.d(t,{A:()=>o});const s={pagination:"CustomPagination_pagination__N5HUP",active:"CustomPagination_active__HzbBN","break-me":"CustomPagination_break-me__LfnQx"};var n=a(2157),c=a.n(n),l=a(579);const o=function(e){let{pageCount:t,handlePageClick:a}=e;return(0,l.jsx)(c(),{previousLabel:"<<",nextLabel:">>",breakLabel:"...",pageCount:t,marginPagesDisplayed:1,pageRangeDisplayed:1,onPageChange:a,containerClassName:s.pagination,activeClassName:s.active,breakClassName:s.breakMe})}},7836:(e,t,a)=>{a.d(t,{A:()=>h});const s="CustomTable_tableContainer__-33Xc",n="CustomTable_tableManage__t1C12",c="CustomTable_tableTrue__p8Hxx",l="CustomTable_tableFalse__fEl5c",o="CustomTable_dangerBackground__ohzgE",r="CustomTable_warningBackground__uRHln";var i=a(4571),d=a(7943),m=(a(9191),a(579));function u(e){const t=e.replace(/([a-z])([A-Z])/g,"$1 $2");return t.charAt(0).toUpperCase()+t.slice(1)}const h=e=>{let{data:t,actions:a,hiddenFields:h=[]}=e;const p=t&&t.length>0?Object.keys(t[0]).filter((e=>!h.includes(e))):[];return(0,m.jsx)(m.Fragment,{children:(0,m.jsx)("div",{className:"table-responsive",children:t&&t.length>0?(0,m.jsxs)("table",{className:"".concat(s),children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{children:[(0,m.jsx)("th",{className:"text-center",children:"No."}),p.map((e=>(0,m.jsx)("th",{className:"text-center",children:u(e)},e))),a&&(0,m.jsx)("th",{className:"".concat(n),children:"Manage"})]})}),(0,m.jsx)("tbody",{children:t.map(((e,t)=>{const s=(0,i.A)(e);return(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{className:"text-center ".concat("danger"===s.timeStatus?o:"warning"===s.timeStatus?r:""),children:t+1}),p.map(((e,t)=>{const a=s.timeStatus;return(0,m.jsx)("td",{className:"".concat("danger"===a?o:"warning"===a?r:""),children:"boolean"===typeof s[e]?(0,m.jsx)("div",{className:"d-flex align-items-center justify-content-center",children:s[e]?(0,m.jsx)("i",{className:"".concat(c," fa-solid fa-circle-check")}):(0,m.jsx)("i",{className:"".concat(l," fa-solid fa-circle-xmark")})}):s[e]},e)})),a&&(0,m.jsxs)("td",{className:"".concat(n," text-nowrap"),children:[a.detail&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("button",{"data-tooltip-id":"detail-tooltip","data-tooltip-content":"Show detail","data-tooltip-delay-show":"50","data-tooltip-place":"top-end",className:"btn btn-sm btn-primary me-1",onClick:()=>a.detail(e.id),children:(0,m.jsx)("i",{className:"fa-solid fa-eye"})}),(0,m.jsx)(d.m_,{id:"detail-tooltip"})]}),a.delete&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("button",{"data-tooltip-id":"delete-tooltip","data-tooltip-content":"Delete","data-tooltip-delay-show":"50","data-tooltip-place":"top-end",className:"btn btn-sm btn-danger",onClick:()=>a.delete(e.id),children:(0,m.jsx)("i",{className:"fa-solid fa-trash"})}),(0,m.jsx)(d.m_,{id:"delete-tooltip"})]}),a.toggle&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("button",{"data-tooltip-id":"toggle-tooltip","data-tooltip-content":a.toggle.tooltip,"data-tooltip-delay-show":"50","data-tooltip-place":"top-end",className:"btn btn-sm btn-secondary",onClick:()=>a.toggle.function(e.id),children:(0,m.jsx)("i",{className:"fa-solid fa-pen-to-square"})}),(0,m.jsx)(d.m_,{id:"toggle-tooltip"})]})]})]},e.id||t)}))})]}):(0,m.jsxs)("div",{className:"d-flex align-items-center justify-content-center",children:[(0,m.jsx)("img",{className:"user-avatar",src:"/Nothing.png",alt:""}),(0,m.jsx)("h1",{className:"m-0 ps-1 fw-semibold text-secondary",children:"THERE IS NO DATA"})]})})})}},3888:(e,t,a)=>{a.d(t,{A:()=>n});var s=a(8488);const n={getList:async function(e){try{return(await s.A.get("/customers",{params:e})).data}catch(t){throw t}},addNew:async function(e){try{return(await s.A.post("/customers",e)).data}catch(t){throw t}},updateCustomer:async function(e,t){try{return(await s.A.post("/customers/".concat(e),t)).data}catch(a){throw a}},getDetail:async function(e){try{return(await s.A.get("/customers/".concat(e))).data}catch(t){throw t}},deleteCustomer:async function(e){try{return(await s.A.delete("/customers/".concat(e))).data}catch(t){throw t}},applyVoucher:async function(e,t){try{return(await s.A.put("/customers/voucher/".concat(t),e)).data}catch(a){throw a}}}},4571:(e,t,a)=>{a.d(t,{A:()=>c});var s=a(6178),n=a.n(s);const c=e=>{const t={...e};return(e=>{const t=[];for(const a in e)if(e.hasOwnProperty(a)){const s=e[a];"string"===typeof s&&n()(s,n().ISO_8601,!0).isValid()&&t.push(a)}return t})(e).forEach((a=>{const s=e[a],c=n()(s,n().ISO_8601,!0);c.isValid()&&("0000-01-01"===c.format("YYYY-MM-DD")?t[a]=c.format("HH:mm"):"00:00:00"!==c.format("HH:mm:ss")?t[a]=c.format("DD/MM/YYYY - HH:mm"):t[a]=c.format("DD/MM/YYYY"))})),t}},7459:(e,t,a)=>{a.d(t,{A:()=>n});var s=a(2773);const n={async get(e,t,a){try{const n=await e(t);n.success?a&&a(n.data):s.A.error(n.message)}catch(n){s.A.error(n)}},async add(e,t,a){try{const n=await e(t);if(n.success)return a&&a(),s.A.success(n.message),n.success;s.A.error(n.message)}catch(n){s.A.error(n)}},async detail(e,t){try{const a=await e(t);return a.success?a.data:(s.A.error(a.message),null)}catch(a){return s.A.error(a),null}},async update(e,t,a,n){try{const c=await e(t,a);return c.success?(s.A.success(c.message),n&&n(),c.success):(s.A.error(c.message),null)}catch(c){s.A.error(c)}},async delete(e,t,a){try{const n=await e(t);n.success?(a&&a(),s.A.success(n.message)):s.A.error(n.message)}catch(n){s.A.error(n)}},async toggleById(e,t,a){try{const n=await e(t);n.success?(s.A.success(n.message),a&&a()):s.A.error(n.message)}catch(n){s.A.error(n)}},async toggleByData(e,t,a){try{const n=await e(t);n.success?(s.A.success(n.message),a&&a()):s.A.error(n.message)}catch(n){s.A.error(n)}}}},4086:(e,t,a)=>{a.d(t,{A:()=>s});const s={tableContainer:"CustomModal_tableContainer__IozWa","modal-xxl":"CustomModal_modal-xxl__kj6Rl","input-container":"CustomModal_input-container__S7gtc","input-label":"CustomModal_input-label__TXN3f","input-field":"CustomModal_input-field__FBwFh","input-checkbox":"CustomModal_input-checkbox__dDIxQ","input-error":"CustomModal_input-error__ZxZf2","custom-checkbox":"CustomModal_custom-checkbox__4ZOt3"}}}]);
//# sourceMappingURL=428.c5a61ba2.chunk.js.map