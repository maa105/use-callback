(this["webpackJsonpuse-callback-maa-example"]=this["webpackJsonpuse-callback-maa-example"]||[]).push([[0],{15:function(e,t,n){"use strict";n.r(t);n(8);var a=n(0),l=n.n(a),r=n(6),c=n.n(r),u=n(5),i=n(2),o=n(1),d=function(e){for(var t=Object(a.useRef)(),n=t.current,l=arguments.length,r=new Array(l>1?l-1:0),c=1;c<l;c++)r[c-1]=arguments[c];if(n)return n.handler=e,n.bindArgs=r,n.callback;var u={handler:e,bindArgs:r},i=function(){for(var e,t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return(e=u.handler).call.apply(e,[this].concat(u.bindArgs,n))};return u.callback=i,t.current=u,i},b=l.a.memo((function(e){var t=e.onClick,n=e.label,r=Object(a.useRef)(0);return++r.current,l.a.createElement("button",{onClick:t},n,l.a.createElement("br",null),"RenderCount:",r.current)})),m=function(){var e=Object(a.useState)(0),t=Object(o.a)(e,2),n=t[0],r=t[1],c=function(e){var t=Object(a.useRef)(),n=t.current;if(n)return n.handler=e,n.callback;var l={handler:e},r=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return l.handler.apply(this,t)};return l.callback=r,t.current=l,r}((function(e){e.stopPropagation(),r(n+1)}));return l.a.createElement("div",null,l.a.createElement("div",null,"Counter: ",n),l.a.createElement(b,{onClick:c,label:"Click Me"}))},s=function(){var e=Object(a.useState)(0),t=Object(o.a)(e,2),n=t[0],r=t[1],c=d((function(e,t,n){n.stopPropagation(),e(t+1)}),r,n);return l.a.createElement("div",null,l.a.createElement("div",null,"Counter: ",n),l.a.createElement(b,{onClick:c,label:"Click Me"}))},f=function(e,t){return e(t+1)},p=function(){var e=Object(a.useState)(0),t=Object(o.a)(e,2),n=t[0],r=t[1],c=d(f,r,n);return l.a.createElement("div",null,l.a.createElement("div",null,"Counter: ",n),l.a.createElement(b,{onClick:c,label:"Click Me"}))},h=function(){var e,t=Object(a.useState)(0),n=Object(o.a)(t,2),r=n[0],c=function(){for(var e=Object(a.useRef)(),t=e.current,n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];if(t)return t.bindArgs=l,t.callback;var c={bindArgs:l},u=function(){for(var e,t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return(e=c.handler).call.apply(e,[this].concat(c.bindArgs,n))};return u.setHandler=function(e){c.handler=e,delete u.setHandler},c.callback=u,e.current=c,u}(n[1],r);return null===(e=c.setHandler)||void 0===e||e.call(c,(function(e,t,n){n.stopPropagation(),e(t+1)})),l.a.createElement("div",null,l.a.createElement("div",null,"Counter: ",r,c.setHandler?"WITH setHandler???":""),l.a.createElement(b,{onClick:c,label:"Click Me"}))},v=function(){var e=Object(a.useState)(0),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)((function(){return[{id:"1",label:"Item 1"},{id:"2",label:"Item 2"},{id:"3",label:"Item 3"}]})),d=Object(o.a)(c,2),m=d[0],s=d[1],f=function(e,t){var n=Object(a.useRef)(),l=n.current;if(l)return l.handler=e,l.mapper;var r={},c="string"===typeof t?function(e){return e[t]}:t,u=0,i={handler:e,mapper:function(e,t){++u;var n=e.map((function(e,n,a){var l=c(e),o=r[l];if(o)return++o.count,o.item=e,t(l,o.callback,e,n,a);var d={count:u,item:e,callback:function(){for(var e,t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];(e=i.handler).call.apply(e,[this,d.item].concat(n))}};return r[l]=d,t(l,d.callback,e,n,a)})),a=[];for(var l in r)r[l].count<u&&a.push(l);return a.forEach((function(e){delete r[e]})),n}};return n.current=i,i.mapper}((function(e,t){t.stopPropagation(),r(n+1),n%6===1&&s(m.map((function(t){return t.id===e.id?Object(i.a)(Object(i.a)({},t),{},{label:"".concat(t.label.split("[")[0],"[Updated@").concat(n+1,"]")}):t}))),n%6===3&&s([].concat(Object(u.a)(m),[{id:"".concat(parseFloat(m[m.length-1].id)+1),label:"Item ".concat(parseFloat(m[m.length-1].id)+1,"[NEW]")}])),n%6===5&&s(m.filter((function(t){return t.id!==e.id})))}),"id");return l.a.createElement("div",null,l.a.createElement("b",null,"Every second click will do something.")," ",l.a.createElement("i",null,"Cycled actions: update clicked -> create new -> delete clicked"),l.a.createElement("div",null,"Counter: ",n),f(m,(function(e,t,n){return l.a.createElement(b,{key:e,onClick:t,label:n.label})})))},E=function(e,t,n,a,l,r){r.stopPropagation(),n(t+1),t%6===1&&l(a.map((function(n){return n.id===e.id?Object(i.a)(Object(i.a)({},n),{},{label:"".concat(n.label.split("[")[0],"[Updated@").concat(t+1,"]")}):n}))),t%6===3&&l([].concat(Object(u.a)(a),[{id:"".concat(parseFloat(a[a.length-1].id)+1),label:"Item ".concat(parseFloat(a[a.length-1].id)+1,"[NEW]")}])),t%6===5&&l(a.filter((function(t){return t.id!==e.id})))},k=function(){var e=Object(a.useState)(0),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)((function(){return[{id:"1",label:"Item 1"},{id:"2",label:"Item 2"},{id:"3",label:"Item 3"}]})),u=Object(o.a)(c,2),i=u[0],d=u[1],m=function(e,t){for(var n=Object(a.useRef)(),l=n.current,r=arguments.length,c=new Array(r>2?r-2:0),u=2;u<r;u++)c[u-2]=arguments[u];if(l)return l.handler=e,l.bindArgs=c,l.mapper;var i={},o="string"===typeof t?function(e){return e[t]}:t,d=0,b={handler:e,bindArgs:c,mapper:function(e,t){++d;var n=e.map((function(e,n,a){var l=o(e),r=i[l];if(r)return++r.count,r.item=e,t(l,r.callback,e,n,a);var c={count:d,item:e,callback:function(){for(var e,t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];(e=b.handler).call.apply(e,[this,c.item].concat(b.bindArgs,n))}};return i[l]=c,t(l,c.callback,e,n,a)})),a=[];for(var l in i)i[l].count<d&&a.push(l);return a.forEach((function(e){delete i[e]})),n}};return n.current=b,b.mapper}(E,"id",n,r,i,d);return l.a.createElement("div",null,l.a.createElement("b",null,"Every second click will do something.")," ",l.a.createElement("i",null,"Cycled actions: update clicked -> create new -> delete clicked"),l.a.createElement("div",null,"Counter: ",n),m(i,(function(e,t,n){return l.a.createElement(b,{key:e,onClick:t,label:n.label})})))},g=function(){var e,t,n=Object(a.useState)(0),r=Object(o.a)(n,2),c=r[0],d=r[1],m=Object(a.useState)((function(){return[{id:"1",label:"Item 1"},{id:"2",label:"Item 2"},{id:"3",label:"Item 3"}]})),s=Object(o.a)(m,2),f=s[0],p=s[1],h=function(){for(var e=Object(a.useRef)(),t=e.current,n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];if(t)return t.bindArgs=l,t.mapper;var c={},u=0,i={bindArgs:l,mapper:function(e,t){++u;var n=e.map((function(e,n,a){var l=i.getKey(e),r=c[l];if(r)return++r.count,r.item=e,t(l,r.callback,e,n,a);var o={count:u,item:e,callback:function(){for(var e,t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return null===(e=i.handler)||void 0===e?void 0:e.call.apply(e,[this,o.item].concat(i.bindArgs,n))}};return c[l]=o,t(l,o.callback,e,n,a)})),a=[];for(var l in c)c[l].count<u&&a.push(l);return a.forEach((function(e){delete c[e]})),n}},o=i.mapper;return o.setHandler=function(e){i.handler=e,delete o.setHandler},o.setKeyGetter=function(e){i.getKey="string"===typeof e?function(t){return t[e]}:e,delete o.setKeyGetter},e.current=i,o}(c,f);return null===(e=h.setKeyGetter)||void 0===e||e.call(h,"id"),null===(t=h.setHandler)||void 0===t||t.call(h,(function(e,t,n,a){a.stopPropagation(),d(t+1),t%6===1&&p(n.map((function(n){return n.id===e.id?Object(i.a)(Object(i.a)({},n),{},{label:"".concat(n.label.split("[")[0],"[Updated@").concat(t+1,"]")}):n}))),t%6===3&&p([].concat(Object(u.a)(n),[{id:"".concat(parseFloat(n[n.length-1].id)+1),label:"Item ".concat(parseFloat(n[n.length-1].id)+1,"[NEW]")}])),t%6===5&&p(n.filter((function(t){return t.id!==e.id})))})),l.a.createElement("div",null,l.a.createElement("b",null,"Every second click will do something.")," ",l.a.createElement("i",null,"Cycled actions: update clicked -> create new -> delete clicked"),l.a.createElement("div",null,"Counter: ",c),h(f,(function(e,t,n){return l.a.createElement(b,{key:e,onClick:t,label:n.label})})))},y=function(){return l.a.createElement("div",null,l.a.createElement("h2",null,"Note"),l.a.createElement("div",null,"Render count should nerver change for the first 4. The last 3 render count only change when label is updated (denoted by [Updates@<number>])."," ",l.a.createElement("i",null,"Counter is incremented by 1 on each click")),l.a.createElement("h2",null,"Tests"),l.a.createElement("hr",null),"useFixedCallback:",l.a.createElement(m,null),l.a.createElement("hr",null),"useBindedCallback:",l.a.createElement(s,null),l.a.createElement("hr",null),"useBindedCallback (with global handler):",l.a.createElement(p,null),l.a.createElement("hr",null),"useDynamicBindedCallback:",l.a.createElement(h,null),l.a.createElement("hr",null),"useFixedCallbackMapper:",l.a.createElement(v,null),l.a.createElement("hr",null),"useBindedCallbackMapper:",l.a.createElement(k,null),l.a.createElement("hr",null),"useDynamicBindedCallbackMapper:",l.a.createElement(g,null),l.a.createElement("hr",null))};c.a.render(l.a.createElement(y,null),document.getElementById("root"))},7:function(e,t,n){e.exports=n(15)},8:function(e,t,n){}},[[7,1,2]]]);
//# sourceMappingURL=main.ccc4a36e.chunk.js.map