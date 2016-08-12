// https://d3js.org/d3-quadtree/ Version 1.0.1. Copyright 2016 Mike Bostock.
!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?i(exports):"function"==typeof define&&define.amd?define(["exports"],i):i(t.d3=t.d3||{})}(this,function(t){"use strict";function i(t){var i=+this._x.call(null,t),r=+this._y.call(null,t);return e(this.cover(i,r),i,r,t)}function e(t,i,e,r){if(isNaN(i)||isNaN(e))return t;var n,h,s,o,a,u,l,_,f,y=t._root,x={data:r},c=t._x0,d=t._y0,v=t._x1,p=t._y1;if(!y)return t._root=x,t;for(;y.length;)if((u=i>=(h=(c+v)/2))?c=h:v=h,(l=e>=(s=(d+p)/2))?d=s:p=s,n=y,!(y=y[_=l<<1|u]))return n[_]=x,t;if(o=+t._x.call(null,y.data),a=+t._y.call(null,y.data),i===o&&e===a)return x.next=y,n?n[_]=x:t._root=x,t;do n=n?n[_]=new Array(4):t._root=new Array(4),(u=i>=(h=(c+v)/2))?c=h:v=h,(l=e>=(s=(d+p)/2))?d=s:p=s;while((_=l<<1|u)===(f=(a>=s)<<1|o>=h));return n[f]=y,n[_]=x,t}function r(t){var i,r,n,h,s=t.length,o=new Array(s),a=new Array(s),u=1/0,l=1/0,_=-(1/0),f=-(1/0);for(r=0;r<s;++r)isNaN(n=+this._x.call(null,i=t[r]))||isNaN(h=+this._y.call(null,i))||(o[r]=n,a[r]=h,n<u&&(u=n),n>_&&(_=n),h<l&&(l=h),h>f&&(f=h));for(_<u&&(u=this._x0,_=this._x1),f<l&&(l=this._y0,f=this._y1),this.cover(u,l).cover(_,f),r=0;r<s;++r)e(this,o[r],a[r],t[r]);return this}function n(t,i){if(isNaN(t=+t)||isNaN(i=+i))return this;var e=this._x0,r=this._y0,n=this._x1,h=this._y1;if(isNaN(e))n=(e=Math.floor(t))+1,h=(r=Math.floor(i))+1;else{if(!(e>t||t>n||r>i||i>h))return this;var s,o,a=n-e,u=this._root;switch(o=(i<(r+h)/2)<<1|t<(e+n)/2){case 0:do s=new Array(4),s[o]=u,u=s;while(a*=2,n=e+a,h=r+a,t>n||i>h);break;case 1:do s=new Array(4),s[o]=u,u=s;while(a*=2,e=n-a,h=r+a,e>t||i>h);break;case 2:do s=new Array(4),s[o]=u,u=s;while(a*=2,n=e+a,r=h-a,t>n||r>i);break;case 3:do s=new Array(4),s[o]=u,u=s;while(a*=2,e=n-a,r=h-a,e>t||r>i)}this._root&&this._root.length&&(this._root=u)}return this._x0=e,this._y0=r,this._x1=n,this._y1=h,this}function h(){var t=[];return this.visit(function(i){if(!i.length)do t.push(i.data);while(i=i.next)}),t}function s(t){return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]}function o(t,i,e,r,n){this.node=t,this.x0=i,this.y0=e,this.x1=r,this.y1=n}function a(t,i,e){var r,n,h,s,a,u,l,_=this._x0,f=this._y0,y=this._x1,x=this._y1,c=[],d=this._root;for(d&&c.push(new o(d,_,f,y,x)),null==e?e=1/0:(_=t-e,f=i-e,y=t+e,x=i+e,e*=e);u=c.pop();)if(!(!(d=u.node)||(n=u.x0)>y||(h=u.y0)>x||(s=u.x1)<_||(a=u.y1)<f))if(d.length){var v=(n+s)/2,p=(h+a)/2;c.push(new o(d[3],v,p,s,a),new o(d[2],n,p,v,a),new o(d[1],v,h,s,p),new o(d[0],n,h,v,p)),(l=(i>=p)<<1|t>=v)&&(u=c[c.length-1],c[c.length-1]=c[c.length-1-l],c[c.length-1-l]=u)}else{var w=t-+this._x.call(null,d.data),N=i-+this._y.call(null,d.data),g=w*w+N*N;if(g<e){var A=Math.sqrt(e=g);_=t-A,f=i-A,y=t+A,x=i+A,r=d.data}}return r}function u(t){if(isNaN(h=+this._x.call(null,t))||isNaN(s=+this._y.call(null,t)))return this;var i,e,r,n,h,s,o,a,u,l,_,f,y=this._root,x=this._x0,c=this._y0,d=this._x1,v=this._y1;if(!y)return this;if(y.length)for(;;){if((u=h>=(o=(x+d)/2))?x=o:d=o,(l=s>=(a=(c+v)/2))?c=a:v=a,i=y,!(y=y[_=l<<1|u]))return this;if(!y.length)break;(i[_+1&3]||i[_+2&3]||i[_+3&3])&&(e=i,f=_)}for(;y.data!==t;)if(r=y,!(y=y.next))return this;return(n=y.next)&&delete y.next,r?(n?r.next=n:delete r.next,this):i?(n?i[_]=n:delete i[_],(y=i[0]||i[1]||i[2]||i[3])&&y===(i[3]||i[2]||i[1]||i[0])&&!y.length&&(e?e[f]=y:this._root=y),this):(this._root=n,this)}function l(t){for(var i=0,e=t.length;i<e;++i)this.remove(t[i]);return this}function _(){return this._root}function f(){var t=0;return this.visit(function(i){if(!i.length)do++t;while(i=i.next)}),t}function y(t){var i,e,r,n,h,s,a=[],u=this._root;for(u&&a.push(new o(u,this._x0,this._y0,this._x1,this._y1));i=a.pop();)if(!t(u=i.node,r=i.x0,n=i.y0,h=i.x1,s=i.y1)&&u.length){var l=(r+h)/2,_=(n+s)/2;(e=u[3])&&a.push(new o(e,l,_,h,s)),(e=u[2])&&a.push(new o(e,r,_,l,s)),(e=u[1])&&a.push(new o(e,l,n,h,_)),(e=u[0])&&a.push(new o(e,r,n,l,_))}return this}function x(t){var i,e=[],r=[];for(this._root&&e.push(new o(this._root,this._x0,this._y0,this._x1,this._y1));i=e.pop();){var n=i.node;if(n.length){var h,s=i.x0,a=i.y0,u=i.x1,l=i.y1,_=(s+u)/2,f=(a+l)/2;(h=n[0])&&e.push(new o(h,s,a,_,f)),(h=n[1])&&e.push(new o(h,_,a,u,f)),(h=n[2])&&e.push(new o(h,s,f,_,l)),(h=n[3])&&e.push(new o(h,_,f,u,l))}r.push(i)}for(;i=r.pop();)t(i.node,i.x0,i.y0,i.x1,i.y1);return this}function c(t){return t[0]}function d(t){return arguments.length?(this._x=t,this):this._x}function v(t){return t[1]}function p(t){return arguments.length?(this._y=t,this):this._y}function w(t,i,e){var r=new N(null==i?c:i,null==e?v:e,NaN,NaN,NaN,NaN);return null==t?r:r.addAll(t)}function N(t,i,e,r,n,h){this._x=t,this._y=i,this._x0=e,this._y0=r,this._x1=n,this._y1=h,this._root=void 0}function g(t){for(var i={data:t.data},e=i;t=t.next;)e=e.next={data:t.data};return i}var A=w.prototype=N.prototype;A.copy=function(){var t,i,e=new N(this._x,this._y,this._x0,this._y0,this._x1,this._y1),r=this._root;if(!r)return e;if(!r.length)return e._root=g(r),e;for(t=[{source:r,target:e._root=new Array(4)}];r=t.pop();)for(var n=0;n<4;++n)(i=r.source[n])&&(i.length?t.push({source:i,target:r.target[n]=new Array(4)}):r.target[n]=g(i));return e},A.add=i,A.addAll=r,A.cover=n,A.data=h,A.extent=s,A.find=a,A.remove=u,A.removeAll=l,A.root=_,A.size=f,A.visit=y,A.visitAfter=x,A.x=d,A.y=p,t.quadtree=w,Object.defineProperty(t,"__esModule",{value:!0})});