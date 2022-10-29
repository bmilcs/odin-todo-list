(()=>{"use strict";var t={991:(t,e,r)=>{r.d(e,{Z:()=>s});var n=r(81),a=r.n(n),o=r(645),i=r.n(o)()(a());i.push([t.id,"@import url(https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,800;1,400&display=swap);"]),i.push([t.id,':root{--ff-main: "Montserrat", sans-serif;--clr-neutral-900: #111111;--clr-neutral-800: #161616;--clr-neutral-300: #e2e2e2;--clr-neutral-200: #f0f0f0;--clr-neutral-100: #ffffff;--clr-accent-100: #1fffcf;--clr-edit-mode: #1fffce44;--border-radius: 8px;--border: 3px solid var(--clr-neutral-900);--box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;--transition: all 0.3s ease-in-out}*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;font-family:var(--ff-main);color:var(--clr-neutral-900)}body{display:grid;grid-template-rows:min-content 1fr min-content;grid-template-columns:max-content 1fr;grid-template-areas:"header header" "sidebar main" "footer footer";min-height:100vh;overflow-x:hidden}input{font-size:1rem;padding:.25rem .5rem;background:0;width:100%;border:none;border-bottom:2px solid var(--clr-neutral-900);background:none;outline:none}label{font-size:.85rem}.header-container{grid-area:header;display:flex;align-items:center;justify-content:flex-end;gap:.5rem;background:var(--clr-accent-100);color:var(--clr-neutral-800);border-bottom:var(--border);font-weight:800;padding:1rem}.header-container img{color:--clr-neutral-800;width:2.5rem;aspect-ratio:1/1}.sidebar{grid-area:sidebar;background:var(--clr-neutral-300);padding:.75rem;border-right:var(--border)}.sidebar h2{background:var(--clr-neutral-900);color:var(--clr-neutral-100);padding:1rem}.sidebar h2:nth-of-type(2){margin-top:1.5rem}.sidebar>*{text-align:left;padding:.75rem .25rem;display:block}.sidebar .add-new-project-container{margin-top:1rem;background:none}.sidebar .add-new-project-container .add-project-textbox-container{display:flex}.sidebar .add-new-project-container .add-project-textbox-container input{border-color:var(--clr-neutral-800)}.sidebar button:not(.add-project-btn){display:flex;align-items:center;gap:.5rem;font-weight:600;font-size:1rem;border:0;outline:none;box-shadow:none;background:var(--border);width:100%}.sidebar button:not(.add-project-btn):hover{background:var(--clr-accent-100)}.content{grid-area:main;background-color:var(--clr-neutral-300);background-image:repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 255, 255, 0.593) 35px, rgba(255, 255, 255, 0.588) 70px)}.project-container{max-width:80ch;padding:1rem;margin:1rem;background:var(--clr-neutral-100);box-shadow:var(--box-shadow)}.project-container .project-title{margin-bottom:.5rem}.add-task-section{padding-block:.5rem}.add-task-section .add-task-textbox-container{display:flex;gap:.5rem}.add-task-section .add-task-textbox-container>*{flex:1}.add-task-btn,.add-project-btn{background:none;border:0;border-radius:50%;max-width:2rem;aspect-ratio:1/1}.task-container{display:flex;align-items:center;justify-content:flex-start;gap:.25rem;padding:.5rem;border-radius:var(--border-radius)}.task-container.edit-task-mode{background-color:var(--clr-edit-mode)}.task-container.completed{opacity:.5}.task-container input.task-date{width:22ch;border:0;outline:0;margin-left:auto;font-size:.8rem}.task-container input{color:var(--clr-neutral-900)}.task-container input:disabled{border:0}.task-container input:not(disabled){border-bottom:2px solid var(--clr-neutral-900)}.footer-container{grid-area:footer;display:grid;place-items:center;padding:.5rem;background:var(--clr-neutral-100);box-shadow:var(--box-shadow);border-top:var(--border)}.footer-container a{position:relative;display:flex;justify-content:center;align-items:center;gap:.75em;text-decoration:none;transition:var(--transition);fill:var(--clr-neutral-200);color:var(--clr-neutral-800)}.footer-container a .github-svg{height:1.75rem}.footer-container a .footer-p{display:grid;place-items:center;font-size:1.5rem;font-weight:bold;text-transform:uppercase}.footer-container a:hover{letter-spacing:4px}.footer-container a::before,.footer-container a::after{--size: 20vw;content:"";display:flex;position:absolute;top:transform(translate(-50%, -50%));height:1px;width:0px;background:var(--clr-neutral-800);transition:var(--transition)}.footer-container a::before{left:calc(-1rem - var(--size))}.footer-container a::after{right:calc(-1rem - var(--size))}.footer-container a:hover::before,.footer-container a:hover::after{width:var(--size)}',""]);const s=i},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var r="",n=void 0!==e[5];return e[4]&&(r+="@supports (".concat(e[4],") {")),e[2]&&(r+="@media ".concat(e[2]," {")),n&&(r+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),r+=t(e),n&&(r+="}"),e[2]&&(r+="}"),e[4]&&(r+="}"),r})).join("")},e.i=function(t,r,n,a,o){"string"==typeof t&&(t=[[null,t,void 0]]);var i={};if(n)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var d=0;d<t.length;d++){var l=[].concat(t[d]);n&&i[l[0]]||(void 0!==o&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=o),r&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=r):l[2]=r),a&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=a):l[4]="".concat(a)),e.push(l))}},e}},81:t=>{t.exports=function(t){return t[1]}},379:t=>{var e=[];function r(t){for(var r=-1,n=0;n<e.length;n++)if(e[n].identifier===t){r=n;break}return r}function n(t,n){for(var o={},i=[],s=0;s<t.length;s++){var c=t[s],d=n.base?c[0]+n.base:c[0],l=o[d]||0,u="".concat(d," ").concat(l);o[d]=l+1;var p=r(u),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)e[p].references++,e[p].updater(f);else{var m=a(f,n);n.byIndex=s,e.splice(s,0,{identifier:u,updater:m,references:1})}i.push(u)}return i}function a(t,e){var r=e.domAPI(e);return r.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;r.update(t=e)}else r.remove()}}t.exports=function(t,a){var o=n(t=t||[],a=a||{});return function(t){t=t||[];for(var i=0;i<o.length;i++){var s=r(o[i]);e[s].references--}for(var c=n(t,a),d=0;d<o.length;d++){var l=r(o[d]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}o=c}}},569:t=>{var e={};t.exports=function(t,r){var n=function(t){if(void 0===e[t]){var r=document.querySelector(t);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}e[t]=r}return e[t]}(t);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(r)}},216:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,r)=>{t.exports=function(t){var e=r.nc;e&&t.setAttribute("nonce",e)}},795:t=>{t.exports=function(t){var e=t.insertStyleElement(t);return{update:function(r){!function(t,e,r){var n="";r.supports&&(n+="@supports (".concat(r.supports,") {")),r.media&&(n+="@media ".concat(r.media," {"));var a=void 0!==r.layer;a&&(n+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),n+=r.css,a&&(n+="}"),r.media&&(n+="}"),r.supports&&(n+="}");var o=r.sourceMap;o&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleTagTransform(n,t,e.options)}(e,t,r)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function r(n){var a=e[n];if(void 0!==a)return a.exports;var o=e[n]={id:n,exports:{}};return t[n](o,o.exports,r),o.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t;r.g.importScripts&&(t=r.g.location+"");var e=r.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var n=e.getElementsByTagName("script");n.length&&(t=n[n.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=t})(),r.nc=void 0,(()=>{var t=r(379),e=r.n(t),n=r(795),a=r.n(n),o=r(569),i=r.n(o),s=r(565),c=r.n(s),d=r(216),l=r.n(d),u=r(589),p=r.n(u),f=r(991),m={};function g(t,e,r,n,a){if(!t)return;const o=document.createElement(t);return e&&e.split(" ").forEach((t=>o.classList.add(t))),"img"===t?o.alt=r:"input"===t?o.value=r:o.textContent=r,"img"===t&&(o.src=a),"a"===t&&(o.href=a),n&&(o.id=n),o}function v(t,...e){if(!t||!e)return;let r;t.nodeType?r=t:(r=g("div",t),t.split(" ").forEach((t=>r.classList.add(t))));const n=t=>{t.nodeType?r.appendChild(t):console.warn(`${x} is not an element!`)};return Array.from(e).forEach((t=>{t.constructor===Array?t.forEach((t=>n(t))):n(t)})),r}m.styleTagTransform=p(),m.setAttributes=c(),m.insert=i().bind(null,"head"),m.domAPI=a(),m.insertStyleElement=l(),e()(f.Z,m),f.Z&&f.Z.locals&&f.Z.locals;const h=r.p+"img/header-icon-2..svg",b=v("header-container",g("h1","title-h1","TODO"),g("img","header-icon","Todo List Icon","",h)),y=r.p+"img/github..svg",k=(()=>{const t=g("a","","","","https://github.com/bmilcs/odin-todo-list");return[g("img","github-svg","GitHub Logo","",y),g("p","footer-p","bmilcs")].forEach((e=>t.appendChild(e))),v("footer-container",t)})(),w={sidebar:g("div","sidebar"),content:g("div","content")};function T(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function D(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function N(t){return N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},N(t)}function j(t){D(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||"object"===N(t)&&"[object Date]"===e?new Date(t.getTime()):"number"==typeof t||"[object Number]"===e?new Date(t):("string"!=typeof t&&"[object String]"!==e||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function E(t,e){D(2,arguments);var r=j(t),n=T(e);return isNaN(n)?new Date(NaN):n?(r.setDate(r.getDate()+n),r):r}var S={};function C(){return S}Math.pow(10,8);var L=36e5,I={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},O=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,M=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,A=/^([+-])(\d{2})(?::?(\d{2}))?$/;function z(t){var e,r={},n=t.split(I.dateTimeDelimiter);if(n.length>2)return r;if(/:/.test(n[0])?e=n[0]:(r.date=n[0],e=n[1],I.timeZoneDelimiter.test(r.date)&&(r.date=t.split(I.timeZoneDelimiter)[0],e=t.substr(r.date.length,t.length))),e){var a=I.timezone.exec(e);a?(r.time=e.replace(a[1],""),r.timezone=a[1]):r.time=e}return r}function F(t,e){var r=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+e)+"})|(\\d{2}|[+-]\\d{"+(2+e)+"})$)"),n=t.match(r);if(!n)return{year:NaN,restDateString:""};var a=n[1]?parseInt(n[1]):null,o=n[2]?parseInt(n[2]):null;return{year:null===o?a:100*o,restDateString:t.slice((n[1]||n[2]).length)}}function U(t,e){if(null===e)return new Date(NaN);var r=t.match(O);if(!r)return new Date(NaN);var n=!!r[4],a=P(r[1]),o=P(r[2])-1,i=P(r[3]),s=P(r[4]),c=P(r[5])-1;if(n)return function(t,e,r){return e>=1&&e<=53&&r>=0&&r<=6}(0,s,c)?function(t,e,r){var n=new Date(0);n.setUTCFullYear(t,0,4);var a=7*(e-1)+r+1-(n.getUTCDay()||7);return n.setUTCDate(n.getUTCDate()+a),n}(e,s,c):new Date(NaN);var d=new Date(0);return function(t,e,r){return e>=0&&e<=11&&r>=1&&r<=(R[e]||(Y(t)?29:28))}(e,o,i)&&function(t,e){return e>=1&&e<=(Y(t)?366:365)}(e,a)?(d.setUTCFullYear(e,o,Math.max(a,i)),d):new Date(NaN)}function P(t){return t?parseInt(t):1}function Z(t){var e=t.match(M);if(!e)return NaN;var r=$(e[1]),n=$(e[2]),a=$(e[3]);return function(t,e,r){return 24===t?0===e&&0===r:r>=0&&r<60&&e>=0&&e<60&&t>=0&&t<25}(r,n,a)?r*L+6e4*n+1e3*a:NaN}function $(t){return t&&parseFloat(t.replace(",","."))||0}function H(t){if("Z"===t)return 0;var e=t.match(A);if(!e)return 0;var r="+"===e[1]?-1:1,n=parseInt(e[2]),a=e[3]&&parseInt(e[3])||0;return function(t,e){return e>=0&&e<=59}(0,a)?r*(n*L+6e4*a):NaN}var R=[31,null,31,30,31,30,31,31,30,31,30,31];function Y(t){return t%400==0||t%4==0&&t%100!=0}function W(t,e="No Date",r=0){this.description=t,this.dueDate=e,this.status=r}function q(t){this.name=t,this.tasks=[]}W.prototype.getDescription=function(){return this.description},W.prototype.getDate=function(){return this.dueDate},W.prototype.getStatus=function(){return this.status?"Complete":"Incomplete"},W.prototype.setDescription=function(t){this.description=t},W.prototype.setDate=function(t){this.dueDate=t},W.prototype.toggleStatus=function(){this.status=!this.status},q.prototype.getTasks=function(){return this.tasks},q.prototype.getLastTask=function(){return this.tasks[this.tasks.length-1]},q.prototype.getName=function(){return this.name},q.prototype.addTask=function(t,e){this.tasks.push(new W(t,e))},q.prototype.deleteTask=function(t){const e=this.getIndexForTask(t);this.tasks.splice(e,1)},q.prototype.getIndexForTask=function(t){return this.tasks.findIndex((e=>e.description===t))};const J=[],V=()=>{localStorage.setItem("bmilcs-todolist",JSON.stringify(J))},G=t=>{const e=new q(t);return J.push(e),V(),e},_=t=>J.find((e=>e.name==t)),B=()=>J.map((t=>t.getName())),K=t=>_(t).tasks,Q=(t,e)=>{const r=_(e).tasks,n=r.findIndex((e=>e.description===t));return r[n]},X=r.p+"img/add..svg",tt=r.p+"img/delete..svg",et=r.p+"img/checked..svg",rt=r.p+"img/unchecked..svg",nt=r.p+"img/edit..svg",at=r.p+"img/arrow..svg",ot=()=>{v(w.sidebar,g("h2","sidebar-title","Due Dates"),it("Overdue"),it("Today"),it("This Week"),it("This Month"),g("h2","sidebar-title","Projects"),it("View All"),ct(),dt())},it=t=>{const e=v(g("button","nav-button"),g("img","arrow-svg","","",at),g("p","button-p",t));return e.addEventListener("click",st),e},st=t=>{const e=t.target.textContent;Ct(),"Today"===e||"This Week"===e||"This Month"===e||"Overdue"===e?ut(e):"View All"===e?pt():ft(e)},ct=()=>B().map((t=>it(t))),dt=()=>{const t=g("label","add-project-label","Add Project");t.htmlFor="add-project-textbox";const e=g("input","add-project-textbox","","add-project-textbox");e.addEventListener("keydown",(t=>{"Enter"===t.key&&lt(t)}));const r=v(g("button","add-project-btn"),g("img","add-project-img","Add Project","",X));return r.addEventListener("click",lt),v("add-new-project-container",t,v("add-project-textbox-container",e,r))},lt=t=>{const e=t.target.closest("div").firstChild.value,r=B();""===e||null===e||"View All"===e||r.some((t=>e===t))||(G(e),St(),ot(),Ct(),ft(e))},ut=t=>{(t=>{let e;const r=new Date;"Today"===t?e=r:"This Week"===t?e=E(function(t,e){var r,n,a,o,i,s,c,d;D(1,arguments);var l=C(),u=T(null!==(r=null!==(n=null!==(a=null!==(o=null==e?void 0:e.weekStartsOn)&&void 0!==o?o:null==e||null===(i=e.locale)||void 0===i||null===(s=i.options)||void 0===s?void 0:s.weekStartsOn)&&void 0!==a?a:l.weekStartsOn)&&void 0!==n?n:null===(c=l.locale)||void 0===c||null===(d=c.options)||void 0===d?void 0:d.weekStartsOn)&&void 0!==r?r:0);if(!(u>=0&&u<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var p=j(t),f=p.getDay(),m=6+(f<u?-7:0)-(f-u);return p.setDate(p.getDate()+m),p.setHours(23,59,59,999),p}(r),1):"This Month"===t?e=function(t){D(1,arguments);var e=j(t),r=e.getMonth();return e.setFullYear(e.getFullYear(),r+1,0),e.setHours(23,59,59,999),e}(r):"Overdue"===t&&(e=r);const n=J.reduce(((n,a)=>{const o=a.tasks.filter((n=>{const a=function(t,e){var r;D(1,arguments);var n=T(null!==(r=null==e?void 0:e.additionalDigits)&&void 0!==r?r:2);if(2!==n&&1!==n&&0!==n)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof t&&"[object String]"!==Object.prototype.toString.call(t))return new Date(NaN);var a,o=z(t);if(o.date){var i=F(o.date,n);a=U(i.restDateString,i.year)}if(!a||isNaN(a.getTime()))return new Date(NaN);var s,c=a.getTime(),d=0;if(o.time&&(d=Z(o.time),isNaN(d)))return new Date(NaN);if(!o.timezone){var l=new Date(c+d),u=new Date(0);return u.setFullYear(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate()),u.setHours(l.getUTCHours(),l.getUTCMinutes(),l.getUTCSeconds(),l.getUTCMilliseconds()),u}return s=H(o.timezone),isNaN(s)?new Date(NaN):new Date(c+d+s)}(n.dueDate),o=!function(t,e){D(2,arguments);var r=j(t),n=j(e);return r.getTime()>n.getTime()}(a,function(t,e){return D(2,arguments),E(t,-T(e))}(r,1)),i=function(t,e){D(2,arguments);var r=j(t),n=j(e);return r.getTime()<n.getTime()}(a,e);return"Overdue"===t?o:!o&&i}));if(0===o.length)return n;const i={};return i.name=a.getName(),i.tasks=[...o],n.push(i),n}),[]);return n})(t).map((t=>mt(t))).forEach((t=>w.content.appendChild(t)))},pt=()=>{B().forEach((t=>{ft(t)}))},ft=t=>{const e=gt(t);w.content.appendChild(e)},mt=t=>{const e=t.name,r=t.tasks;return v("project-container",g("h2","project-title",e),vt(e),bt(r))},gt=t=>{const e=K(t);return v("project-container",g("h2","project-title",t),vt(t),bt(e))},vt=t=>{const e=`add-task-textbox-${t.replace(/\s+/g,"").toLowerCase()}`,r=g("label","add-task-label","Add task");r.htmlFor=e;const n=g("input","add-task-textbox","",e);n.addEventListener("keydown",(t=>{"Enter"===t.key&&ht(t)}));const a=v(g("button","add-task-btn"),g("img","add-task-img","Add Task","",X));return a.addEventListener("click",ht),v("add-task-section",r,v("add-task-textbox-container",n,a))},ht=t=>{const e=t.target,r=Lt(e),n=r.querySelector("input");if(""===n.value)return;const a=Ot(e);((t,e)=>{_(e).addTask(t),V()})(n.value,a);const o=_(a),i=yt(o.getLastTask());r.appendChild(i),n.value=""},bt=t=>t.map((t=>yt(t))),yt=t=>{const e=g("img","task-status unchecked","","",rt),r=g("input","task-description-input",t.getDescription());r.disabled=!0;const n=g("input","task-date",t.getDate());n.setAttribute("type","date"),n.addEventListener("change",kt);const a=g("img","delete-task","Delete Task","",tt),o=g("img","edit-task-description","Edit Task Description","",nt);return o.addEventListener("click",Dt),a.addEventListener("click",Nt),e.addEventListener("click",wt),v("task-container",e,r,n,o,a)},kt=t=>{const e=t.target,r=t.target.value,n=Ot(e);((t,e,r)=>{Q(e,r).setDate(t),V()})(r,Mt(e),n)},wt=t=>{const e=t.target,r=Ot(e),n=Mt(e),a=Q(n,r);a.toggleStatus(),"Complete"===a.getStatus()?xt(e):Tt(e)},xt=t=>{It(t).classList.add("completed"),t.src=et;const e=At(t);e.style.textDecoration="line-through",e.style.fontStyle="italic"},Tt=t=>{It(t).classList.remove("completed"),t.src=rt;const e=At(t);e.style.textDecoration="none",e.style.fontStyle="normal"},Dt=t=>{const e=t.target,r=At(e),n=r.value;r.disabled=!1,r.focus();const a=It(e);a.classList.add("edit-task-mode");const o=t=>{if("Enter"===t.key||"Escape"===t.key||t.target===e){if(r.disabled=!0,a.classList.remove("edit-task-mode"),"Escape"===t.key)r.value=n;else{const t=r.value;if(t!==n){const r=Ot(e);((t,e,r)=>{Q(t,r).description=e})(n,t,r)}}e.removeEventListener("click",o),r.removeEventListener("keydown",o),e.addEventListener("click",Dt,{once:!0})}};e.removeEventListener("click",Dt),e.addEventListener("click",o),r.addEventListener("keydown",o)},Nt=t=>{const e=t.target,r=Ot(e);((t,e)=>{_(e).deleteTask(t),V()})(Mt(e),r),It(e).remove(),jt(r)},jt=t=>{(t=>0===K(t).length)(t)&&((t=>{const e=J.findIndex((e=>e.name===t));J.splice(e,1),V()})(t),Ct(),St(),ot(),pt())},Et=t=>{for(;t.firstChild;)t.removeChild(t.firstChild)},St=()=>Et(w.sidebar),Ct=()=>Et(w.content),Lt=t=>t.closest(".project-container"),It=t=>t.closest(".task-container"),Ot=t=>Lt(t).firstChild.textContent,Mt=t=>t.parentElement.children.item(1).value,At=t=>t.parentElement.children.item(1);null!==localStorage.getItem("bmilcs-todolist")?JSON.parse(localStorage.getItem("bmilcs-todolist")).map((t=>{const e=t.tasks.map((t=>new W(t.description,t.dueDate,t.status))),r=Object.assign(new q(t.name));return r.tasks=e,r})).forEach((t=>J.push(t))):(()=>{const t=G("Web Development");t.addTask("Finish my todo list project","2022-11-01"),t.addTask("Complete Odin Project","2023-01-01"),t.addTask("Lorem ipsum2","2022-10-29"),t.addTask("Lorem ipsum","2022-10-30");const e=G("Home Renovation");e.addTask("Install living room windows","2023-01-01"),e.addTask("Spray foam insulation in window rough opening gaps","2023-01-01"),e.addTask("Cut & install window casing","2023-01-01"),e.addTask("Prime window trim","2023-01-01"),e.addTask("Caulk interior & exterior","2023-01-01"),e.addTask("Paint window","2023-01-01"),V()})(),v(document.querySelector("body"),b,w.sidebar,w.content,k),ot(),pt()})()})();