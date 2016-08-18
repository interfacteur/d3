// https://d3js.org/d3-selection/ Version 1.0.2. Copyright 2016 Mike Bostock.
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(t.d3=t.d3||{})}(this,function(t){"use strict";function n(t){var n=t+="",e=n.indexOf(":");return e>=0&&"xmlns"!==(n=t.slice(0,e))&&(t=t.slice(e+1)),Ut.hasOwnProperty(n)?{space:Ut[n],local:t}:t}function e(t){return function(){var n=this.ownerDocument,e=this.namespaceURI;return e===It&&n.documentElement.namespaceURI===It?n.createElement(t):n.createElementNS(e,t)}}function r(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function i(t){var i=n(t);return(i.local?r:e)(i)}function o(){return new u}function u(){this._="@"+(++kt).toString(36)}function c(t,n,e){return t=s(t,n,e),function(n){var e=n.relatedTarget;e&&(e===this||8&e.compareDocumentPosition(this))||t.call(this,n)}}function s(n,e,r){return function(i){var o=t.event;t.event=i;try{n.call(this,this.__data__,e,r)}finally{t.event=o}}}function a(t){return t.trim().split(/^|\s+/).map(function(t){var n="",e=t.indexOf(".");return e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),{type:t,name:n}})}function l(t){return function(){var n=this.__on;if(n){for(var e,r=0,i=-1,o=n.length;r<o;++r)e=n[r],t.type&&e.type!==t.type||e.name!==t.name?n[++i]=e:this.removeEventListener(e.type,e.listener,e.capture);++i?n.length=i:delete this.__on}}}function f(t,n,e){var r=Ft.hasOwnProperty(t.type)?c:s;return function(i,o,u){var c,s=this.__on,a=r(n,o,u);if(s)for(var l=0,f=s.length;l<f;++l)if((c=s[l]).type===t.type&&c.name===t.name)return this.removeEventListener(c.type,c.listener,c.capture),this.addEventListener(c.type,c.listener=a,c.capture=e),void(c.value=n);this.addEventListener(t.type,a,e),c={type:t.type,name:t.name,value:n,listener:a,capture:e},s?s.push(c):this.__on=[c]}}function h(t,n,e){var r,i,o=a(t+""),u=o.length;{if(!(arguments.length<2)){for(c=n?f:l,null==e&&(e=!1),r=0;r<u;++r)this.each(c(o[r],n,e));return this}var c=this.node().__on;if(c)for(var s,h=0,p=c.length;h<p;++h)for(r=0,s=c[h];r<u;++r)if((i=o[r]).type===s.type&&i.name===s.name)return s.value}}function p(n,e,r,i){var o=t.event;n.sourceEvent=t.event,t.event=n;try{return e.apply(r,i)}finally{t.event=o}}function _(){for(var n,e=t.event;n=e.sourceEvent;)e=n;return e}function v(t,n){var e=t.ownerSVGElement||t;if(e.createSVGPoint){var r=e.createSVGPoint();return r.x=n.clientX,r.y=n.clientY,r=r.matrixTransform(t.getScreenCTM().inverse()),[r.x,r.y]}var i=t.getBoundingClientRect();return[n.clientX-i.left-t.clientLeft,n.clientY-i.top-t.clientTop]}function d(t){var n=_();return n.changedTouches&&(n=n.changedTouches[0]),v(t,n)}function m(){}function y(t){return null==t?m:function(){return this.querySelector(t)}}function g(t){"function"!=typeof t&&(t=y(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,u,c=n[i],s=c.length,a=r[i]=new Array(s),l=0;l<s;++l)(o=c[l])&&(u=t.call(o,o.__data__,l,c))&&("__data__"in o&&(u.__data__=o.__data__),a[l]=u);return new Dt(r,this._parents)}function w(){return[]}function A(t){return null==t?w:function(){return this.querySelectorAll(t)}}function x(t){"function"!=typeof t&&(t=A(t));for(var n=this._groups,e=n.length,r=[],i=[],o=0;o<e;++o)for(var u,c=n[o],s=c.length,a=0;a<s;++a)(u=c[a])&&(r.push(t.call(u,u.__data__,a,c)),i.push(u));return new Dt(r,i)}function S(t){"function"!=typeof t&&(t=$t(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,u=n[i],c=u.length,s=r[i]=[],a=0;a<c;++a)(o=u[a])&&t.call(o,o.__data__,a,u)&&s.push(o);return new Dt(r,this._parents)}function b(t){return new Array(t.length)}function E(){return new Dt(this._enter||this._groups.map(b),this._parents)}function N(t,n){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=n}function C(t){return function(){return t}}function M(t,n,e,r,i,o){for(var u,c=0,s=n.length,a=o.length;c<a;++c)(u=n[c])?(u.__data__=o[c],r[c]=u):e[c]=new N(t,o[c]);for(;c<s;++c)(u=n[c])&&(i[c]=u)}function L(t,n,e,r,i,o,u){var c,s,a,l={},f=n.length,h=o.length,p=new Array(f);for(c=0;c<f;++c)(s=n[c])&&(p[c]=a=Kt+u.call(s,s.__data__,c,n),a in l?i[c]=s:l[a]=s);for(c=0;c<h;++c)a=Kt+u.call(t,o[c],c,o),(s=l[a])?(r[c]=s,s.__data__=o[c],l[a]=null):e[c]=new N(t,o[c]);for(c=0;c<f;++c)(s=n[c])&&l[p[c]]===s&&(i[c]=s)}function P(t,n){if(!t)return p=new Array(this.size()),a=-1,this.each(function(t){p[++a]=t}),p;var e=n?L:M,r=this._parents,i=this._groups;"function"!=typeof t&&(t=C(t));for(var o=i.length,u=new Array(o),c=new Array(o),s=new Array(o),a=0;a<o;++a){var l=r[a],f=i[a],h=f.length,p=t.call(l,l&&l.__data__,a,r),_=p.length,v=c[a]=new Array(_),d=u[a]=new Array(_),m=s[a]=new Array(h);e(l,f,v,d,m,p,n);for(var y,g,w=0,A=0;w<_;++w)if(y=v[w]){for(w>=A&&(A=w+1);!(g=d[A])&&++A<_;);y._next=g||null}}return u=new Dt(u,r),u._enter=c,u._exit=s,u}function T(){return new Dt(this._exit||this._groups.map(b),this._parents)}function q(t){for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),u=new Array(r),c=0;c<o;++c)for(var s,a=n[c],l=e[c],f=a.length,h=u[c]=new Array(f),p=0;p<f;++p)(s=a[p]||l[p])&&(h[p]=s);for(;c<r;++c)u[c]=n[c];return new Dt(u,this._parents)}function O(){for(var t=this._groups,n=-1,e=t.length;++n<e;)for(var r,i=t[n],o=i.length-1,u=i[o];--o>=0;)(r=i[o])&&(u&&u!==r.nextSibling&&u.parentNode.insertBefore(r,u),u=r);return this}function B(t){function n(n,e){return n&&e?t(n.__data__,e.__data__):!n-!e}t||(t=D);for(var e=this._groups,r=e.length,i=new Array(r),o=0;o<r;++o){for(var u,c=e[o],s=c.length,a=i[o]=new Array(s),l=0;l<s;++l)(u=c[l])&&(a[l]=u);a.sort(n)}return new Dt(i,this._parents).order()}function D(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function V(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this}function R(){var t=new Array(this.size()),n=-1;return this.each(function(){t[++n]=this}),t}function j(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r=t[n],i=0,o=r.length;i<o;++i){var u=r[i];if(u)return u}return null}function z(){var t=0;return this.each(function(){++t}),t}function H(){return!this.node()}function I(t){for(var n=this._groups,e=0,r=n.length;e<r;++e)for(var i,o=n[e],u=0,c=o.length;u<c;++u)(i=o[u])&&t.call(i,i.__data__,u,o);return this}function U(t){return function(){this.removeAttribute(t)}}function k(t){return function(){this.removeAttributeNS(t.space,t.local)}}function G(t,n){return function(){this.setAttribute(t,n)}}function X(t,n){return function(){this.setAttributeNS(t.space,t.local,n)}}function Y(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttribute(t):this.setAttribute(t,e)}}function $(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}}function F(t,e){var r=n(t);if(arguments.length<2){var i=this.node();return r.local?i.getAttributeNS(r.space,r.local):i.getAttribute(r)}return this.each((null==e?r.local?k:U:"function"==typeof e?r.local?$:Y:r.local?X:G)(r,e))}function J(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function K(t){return function(){this.style.removeProperty(t)}}function Q(t,n,e){return function(){this.style.setProperty(t,n,e)}}function W(t,n,e){return function(){var r=n.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,e)}}function Z(t,n,e){var r;return arguments.length>1?this.each((null==n?K:"function"==typeof n?W:Q)(t,n,null==e?"":e)):J(r=this.node()).getComputedStyle(r,null).getPropertyValue(t)}function tt(t){return function(){delete this[t]}}function nt(t,n){return function(){this[t]=n}}function et(t,n){return function(){var e=n.apply(this,arguments);null==e?delete this[t]:this[t]=e}}function rt(t,n){return arguments.length>1?this.each((null==n?tt:"function"==typeof n?et:nt)(t,n)):this.node()[t]}function it(t){return t.trim().split(/^|\s+/)}function ot(t){return t.classList||new ut(t)}function ut(t){this._node=t,this._names=it(t.getAttribute("class")||"")}function ct(t,n){for(var e=ot(t),r=-1,i=n.length;++r<i;)e.add(n[r])}function st(t,n){for(var e=ot(t),r=-1,i=n.length;++r<i;)e.remove(n[r])}function at(t){return function(){ct(this,t)}}function lt(t){return function(){st(this,t)}}function ft(t,n){return function(){(n.apply(this,arguments)?ct:st)(this,t)}}function ht(t,n){var e=it(t+"");if(arguments.length<2){for(var r=ot(this.node()),i=-1,o=e.length;++i<o;)if(!r.contains(e[i]))return!1;return!0}return this.each(("function"==typeof n?ft:n?at:lt)(e,n))}function pt(){this.textContent=""}function _t(t){return function(){this.textContent=t}}function vt(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}function dt(t){return arguments.length?this.each(null==t?pt:("function"==typeof t?vt:_t)(t)):this.node().textContent}function mt(){this.innerHTML=""}function yt(t){return function(){this.innerHTML=t}}function gt(t){return function(){var n=t.apply(this,arguments);this.innerHTML=null==n?"":n}}function wt(t){return arguments.length?this.each(null==t?mt:("function"==typeof t?gt:yt)(t)):this.node().innerHTML}function At(){this.nextSibling&&this.parentNode.appendChild(this)}function xt(){return this.each(At)}function St(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function bt(){return this.each(St)}function Et(t){var n="function"==typeof t?t:i(t);return this.select(function(){return this.appendChild(n.apply(this,arguments))})}function Nt(){return null}function Ct(t,n){var e="function"==typeof t?t:i(t),r=null==n?Nt:"function"==typeof n?n:y(n);return this.select(function(){return this.insertBefore(e.apply(this,arguments),r.apply(this,arguments)||null)})}function Mt(){var t=this.parentNode;t&&t.removeChild(this)}function Lt(){return this.each(Mt)}function Pt(t){return arguments.length?this.property("__data__",t):this.node().__data__}function Tt(t,n,e){var r=J(t),i=r.CustomEvent;i?i=new i(n,e):(i=r.document.createEvent("Event"),e?(i.initEvent(n,e.bubbles,e.cancelable),i.detail=e.detail):i.initEvent(n,!1,!1)),t.dispatchEvent(i)}function qt(t,n){return function(){return Tt(this,t,n)}}function Ot(t,n){return function(){return Tt(this,t,n.apply(this,arguments))}}function Bt(t,n){return this.each(("function"==typeof n?Ot:qt)(t,n))}function Dt(t,n){this._groups=t,this._parents=n}function Vt(){return new Dt([[document.documentElement]],Qt)}function Rt(t){return"string"==typeof t?new Dt([[document.querySelector(t)]],[document.documentElement]):new Dt([[t]],Qt)}function jt(t){return"string"==typeof t?new Dt([document.querySelectorAll(t)],[document.documentElement]):new Dt([null==t?[]:t],Qt)}function zt(t,n,e){arguments.length<3&&(e=n,n=_().changedTouches);for(var r,i=0,o=n?n.length:0;i<o;++i)if((r=n[i]).identifier===e)return v(t,r);return null}function Ht(t,n){null==n&&(n=_().touches);for(var e=0,r=n?n.length:0,i=new Array(r);e<r;++e)i[e]=v(t,n[e]);return i}var It="http://www.w3.org/1999/xhtml",Ut={svg:"http://www.w3.org/2000/svg",xhtml:It,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},kt=0;u.prototype=o.prototype={constructor:u,get:function(t){for(var n=this._;!(n in t);)if(!(t=t.parentNode))return;return t[n]},set:function(t,n){return t[this._]=n},remove:function(t){return this._ in t&&delete t[this._]},toString:function(){return this._}};var Gt=function(t){return function(){return this.matches(t)}};if("undefined"!=typeof document){var Xt=document.documentElement;if(!Xt.matches){var Yt=Xt.webkitMatchesSelector||Xt.msMatchesSelector||Xt.mozMatchesSelector||Xt.oMatchesSelector;Gt=function(t){return function(){return Yt.call(this,t)}}}}var $t=Gt,Ft={};if(t.event=null,"undefined"!=typeof document){var Jt=document.documentElement;"onmouseenter"in Jt||(Ft={mouseenter:"mouseover",mouseleave:"mouseout"})}N.prototype={constructor:N,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,n){return this._parent.insertBefore(t,n)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};var Kt="$";ut.prototype={add:function(t){var n=this._names.indexOf(t);n<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};var Qt=[null];Dt.prototype=Vt.prototype={constructor:Dt,select:g,selectAll:x,filter:S,data:P,enter:E,exit:T,merge:q,order:O,sort:B,call:V,nodes:R,node:j,size:z,empty:H,each:I,attr:F,style:Z,property:rt,classed:ht,text:dt,html:wt,raise:xt,lower:bt,append:Et,insert:Ct,remove:Lt,datum:Pt,on:h,dispatch:Bt},t.creator=i,t.local=o,t.matcher=$t,t.mouse=d,t.namespace=n,t.namespaces=Ut,t.select=Rt,t.selectAll=jt,t.selection=Vt,t.selector=y,t.selectorAll=A,t.touch=zt,t.touches=Ht,t.window=J,t.customEvent=p,Object.defineProperty(t,"__esModule",{value:!0})});