(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[318],{4184:function(e,t){var r;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function s(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var l=typeof r;if("string"===l||"number"===l)e.push(r);else if(Array.isArray(r)){if(r.length){var i=s.apply(null,r);i&&e.push(i)}}else if("object"===l){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){e.push(r.toString());continue}for(var o in r)n.call(r,o)&&r[o]&&e.push(o)}}}return e.join(" ")}e.exports?(s.default=s,e.exports=s):void 0!==(r=(function(){return s}).apply(t,[]))&&(e.exports=r)}()},1176:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/seasons/[id]",function(){return r(1229)}])},1229:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSG:function(){return x},default:function(){return j}});var n=r(5893),s=r(1664),l=r.n(s),i=r(4184),o=r.n(i),c=r(7294),u=r(6792);let a=c.forwardRef(({bsPrefix:e,className:t,as:r="div",...s},l)=>{let i=(0,u.vE)(e,"row"),c=(0,u.pi)(),a=(0,u.zG)(),d=`${i}-cols`,f=[];return c.forEach(e=>{let t;let r=s[e];delete s[e],null!=r&&"object"==typeof r?{cols:t}=r:t=r;let n=e!==a?`-${e}`:"";null!=t&&f.push(`${d}${n}-${t}`)}),(0,n.jsx)(r,{ref:l,...s,className:o()(t,i,...f)})});a.displayName="Row";let d=c.forwardRef((e,t)=>{let[{className:r,...s},{as:l="div",bsPrefix:i,spans:c}]=function({as:e,bsPrefix:t,className:r,...n}){t=(0,u.vE)(t,"col");let s=(0,u.pi)(),l=(0,u.zG)(),i=[],c=[];return s.forEach(e=>{let r,s,o;let u=n[e];delete n[e],"object"==typeof u&&null!=u?{span:r,offset:s,order:o}=u:r=u;let a=e!==l?`-${e}`:"";r&&i.push(!0===r?`${t}${a}`:`${t}${a}-${r}`),null!=o&&c.push(`order${a}-${o}`),null!=s&&c.push(`offset${a}-${s}`)}),[{...n,className:o()(r,...i,...c)},{as:e,bsPrefix:t,spans:i}]}(e);return(0,n.jsx)(l,{...s,ref:t,className:o()(r,!c.length&&i)})});d.displayName="Col";var f=r(5147),p=r(7460);let h=e=>{let{games:t}=e,r={O:0,V:0,H:0,T:0,TM:0,PM:0,P:0,LP:null},s=e=>{console.log(e,JSON.stringify(r.current)),e.pel_score>e.opp_score?(r.V++,r.P+=2):e.pel_score===e.opp_score?(r.T++,r.P+=1):r.H++,r.TM+=e.pel_score,r.PM+=e.opp_score,r.O++};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("h2",{children:"Ottelut"}),(0,n.jsxs)(f.Z,{children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:"Pvm"}),(0,n.jsx)("th",{children:"Ottelu"}),(0,n.jsx)("th",{children:"Tulos"}),(0,n.jsx)("th",{children:"Yleis\xf6"}),["O","V","T","H","TM","PM","PTS"].map(e=>(0,n.jsx)("th",{children:e},e))]})}),(0,n.jsx)("tbody",{children:t.map(e=>(s(e),(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{children:(0,n.jsx)(l(),{href:"/games/".concat(e.id),children:(0,p.formatDate)(e.gamedate)})}),(0,n.jsx)("td",{children:e.matchup}),(0,n.jsx)("td",{children:e.score}),(0,n.jsx)("td",{children:e.attendance}),["O","V","T","H","TM","PM","P"].map(e=>(0,n.jsx)("td",{children:r[e]},e))]},e.id)))})]})]})};var x=!0,j=e=>{let{season:t}=e,{games:r}=t;return(0,n.jsx)(a,{children:(0,n.jsx)(d,{md:12,children:(0,n.jsx)(h,{games:r})})})}},5147:function(e,t,r){"use strict";var n=r(4184),s=r.n(n),l=r(7294),i=r(6792),o=r(5893);let c=l.forwardRef(({bsPrefix:e,className:t,striped:r,bordered:n,borderless:l,hover:c,size:u,variant:a,responsive:d,...f},p)=>{let h=(0,i.vE)(e,"table"),x=s()(t,h,a&&`${h}-${a}`,u&&`${h}-${u}`,r&&`${h}-${"string"==typeof r?`striped-${r}`:"striped"}`,n&&`${h}-bordered`,l&&`${h}-borderless`,c&&`${h}-hover`),j=(0,o.jsx)("table",{...f,className:x,ref:p});if(d){let e=`${h}-responsive`;return"string"==typeof d&&(e=`${e}-${d}`),(0,o.jsx)("div",{className:e,children:j})}return j});t.Z=c},6792:function(e,t,r){"use strict";r.d(t,{pi:function(){return c},vE:function(){return o},zG:function(){return u}});var n=r(7294);r(5893);let s=n.createContext({prefixes:{},breakpoints:["xxl","xl","lg","md","sm","xs"],minBreakpoint:"xs"}),{Consumer:l,Provider:i}=s;function o(e,t){let{prefixes:r}=(0,n.useContext)(s);return e||r[t]||t}function c(){let{breakpoints:e}=(0,n.useContext)(s);return e}function u(){let{minBreakpoint:e}=(0,n.useContext)(s);return e}}},function(e){e.O(0,[664,774,888,179],function(){return e(e.s=1176)}),_N_E=e.O()}]);