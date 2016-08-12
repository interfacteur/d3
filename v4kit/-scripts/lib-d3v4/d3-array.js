// https://d3js.org/d3-array/ Version 1.0.1. Copyright 2016 Mike Bostock.
!function(n,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r(n.d3=n.d3||{})}(this,function(n){"use strict";function r(n,r){return n<r?-1:n>r?1:n>=r?0:NaN}function t(n){return 1===n.length&&(n=e(n)),{left:function(r,t,e,u){for(null==e&&(e=0),null==u&&(u=r.length);e<u;){var o=e+u>>>1;n(r[o],t)<0?e=o+1:u=o}return e},right:function(r,t,e,u){for(null==e&&(e=0),null==u&&(u=r.length);e<u;){var o=e+u>>>1;n(r[o],t)>0?u=o:e=o+1}return e}}}function e(n){return function(t,e){return r(n(t),e)}}function u(n,r){return r<n?-1:r>n?1:r>=n?0:NaN}function o(n){return null===n?NaN:+n}function f(n,r){var t,e,u=n.length,f=0,l=0,i=-1,a=0;if(null==r)for(;++i<u;)isNaN(t=o(n[i]))||(e=t-f,f+=e/++a,l+=e*(t-f));else for(;++i<u;)isNaN(t=o(r(n[i],i,n)))||(e=t-f,f+=e/++a,l+=e*(t-f));if(a>1)return l/(a-1)}function l(n,r){var t=f(n,r);return t?Math.sqrt(t):t}function i(n,r){var t,e,u,o=-1,f=n.length;if(null==r){for(;++o<f;)if(null!=(e=n[o])&&e>=e){t=u=e;break}for(;++o<f;)null!=(e=n[o])&&(t>e&&(t=e),u<e&&(u=e))}else{for(;++o<f;)if(null!=(e=r(n[o],o,n))&&e>=e){t=u=e;break}for(;++o<f;)null!=(e=r(n[o],o,n))&&(t>e&&(t=e),u<e&&(u=e))}return[t,u]}function a(n){return function(){return n}}function h(n){return n}function c(n,r,t){n=+n,r=+r,t=(u=arguments.length)<2?(r=n,n=0,1):u<3?1:+t;for(var e=-1,u=0|Math.max(0,Math.ceil((r-n)/t)),o=new Array(u);++e<u;)o[e]=n+e*t;return o}function s(n,r,t){var e=g(n,r,t);return c(Math.ceil(n/e)*e,Math.floor(r/e)*e+e/2,e)}function g(n,r,t){var e=Math.abs(r-n)/Math.max(0,t),u=Math.pow(10,Math.floor(Math.log(e)/Math.LN10)),o=e/u;return o>=C?u*=10:o>=E?u*=5:o>=G&&(u*=2),r<n?-u:u}function v(n){return Math.ceil(Math.log(n.length)/Math.LN2)+1}function p(){function n(n){var u,o,f=n.length,l=new Array(f);for(u=0;u<f;++u)l[u]=r(n[u],u,n);var i=t(l),a=i[0],h=i[1],c=e(l,a,h);Array.isArray(c)||(c=s(a,h,c));for(var g=c.length;c[0]<=a;)c.shift(),--g;for(;c[g-1]>=h;)c.pop(),--g;var v,p=new Array(g+1);for(u=0;u<=g;++u)v=p[u]=[],v.x0=u>0?c[u-1]:a,v.x1=u<g?c[u]:h;for(u=0;u<f;++u)o=l[u],a<=o&&o<=h&&p[F(c,o,0,g)].push(n[u]);return p}var r=h,t=i,e=v;return n.value=function(t){return arguments.length?(r="function"==typeof t?t:a(t),n):r},n.domain=function(r){return arguments.length?(t="function"==typeof r?r:a([r[0],r[1]]),n):t},n.thresholds=function(r){return arguments.length?(e="function"==typeof r?r:a(Array.isArray(r)?R.call(r):r),n):e},n}function d(n,r,t){if(null==t&&(t=o),e=n.length){if((r=+r)<=0||e<2)return+t(n[0],0,n);if(r>=1)return+t(n[e-1],e-1,n);var e,u=(e-1)*r,f=Math.floor(u),l=+t(n[f],f,n),i=+t(n[f+1],f+1,n);return l+(i-l)*(u-f)}}function M(n,t,e){return n=B.call(n,o).sort(r),Math.ceil((e-t)/(2*(d(n,.75)-d(n,.25))*Math.pow(n.length,-1/3)))}function y(n,r,t){return Math.ceil((t-r)/(3.5*l(n)*Math.pow(n.length,-1/3)))}function N(n,r){var t,e,u=-1,o=n.length;if(null==r){for(;++u<o;)if(null!=(e=n[u])&&e>=e){t=e;break}for(;++u<o;)null!=(e=n[u])&&e>t&&(t=e)}else{for(;++u<o;)if(null!=(e=r(n[u],u,n))&&e>=e){t=e;break}for(;++u<o;)null!=(e=r(n[u],u,n))&&e>t&&(t=e)}return t}function m(n,r){var t,e=0,u=n.length,f=-1,l=u;if(null==r)for(;++f<u;)isNaN(t=o(n[f]))?--l:e+=t;else for(;++f<u;)isNaN(t=o(r(n[f],f,n)))?--l:e+=t;if(l)return e/l}function b(n,t){var e,u=[],f=n.length,l=-1;if(null==t)for(;++l<f;)isNaN(e=o(n[l]))||u.push(e);else for(;++l<f;)isNaN(e=o(t(n[l],l,n)))||u.push(e);return d(u.sort(r),.5)}function A(n){for(var r,t,e,u=n.length,o=-1,f=0;++o<u;)f+=n[o].length;for(t=new Array(f);--u>=0;)for(e=n[u],r=e.length;--r>=0;)t[--f]=e[r];return t}function w(n,r){var t,e,u=-1,o=n.length;if(null==r){for(;++u<o;)if(null!=(e=n[u])&&e>=e){t=e;break}for(;++u<o;)null!=(e=n[u])&&t>e&&(t=e)}else{for(;++u<o;)if(null!=(e=r(n[u],u,n))&&e>=e){t=e;break}for(;++u<o;)null!=(e=r(n[u],u,n))&&t>e&&(t=e)}return t}function x(n){for(var r=0,t=n.length-1,e=n[0],u=new Array(t<0?0:t);r<t;)u[r]=[e,e=n[++r]];return u}function k(n,r){for(var t=r.length,e=new Array(t);t--;)e[t]=n[r[t]];return e}function q(n,t){if(e=n.length){var e,u,o=0,f=0,l=n[f];for(t||(t=r);++o<e;)(t(u=n[o],l)<0||0!==t(l,l))&&(l=u,f=o);return 0===t(l,l)?f:void 0}}function L(n,r,t){for(var e,u,o=(null==t?n.length:t)-(r=null==r?0:+r);o;)u=Math.random()*o--|0,e=n[o+r],n[o+r]=n[u+r],n[u+r]=e;return n}function S(n,r){var t,e=0,u=n.length,o=-1;if(null==r)for(;++o<u;)(t=+n[o])&&(e+=t);else for(;++o<u;)(t=+r(n[o],o,n))&&(e+=t);return e}function j(n){if(!(u=n.length))return[];for(var r=-1,t=w(n,_),e=new Array(t);++r<t;)for(var u,o=-1,f=e[r]=new Array(u);++o<u;)f[o]=n[o][r];return e}function _(n){return n.length}function z(){return j(arguments)}var D=t(r),F=D.right,O=D.left,P=Array.prototype,R=P.slice,B=P.map,C=Math.sqrt(50),E=Math.sqrt(10),G=Math.sqrt(2);n.bisect=F,n.bisectRight=F,n.bisectLeft=O,n.ascending=r,n.bisector=t,n.descending=u,n.deviation=l,n.extent=i,n.histogram=p,n.thresholdFreedmanDiaconis=M,n.thresholdScott=y,n.thresholdSturges=v,n.max=N,n.mean=m,n.median=b,n.merge=A,n.min=w,n.pairs=x,n.permute=k,n.quantile=d,n.range=c,n.scan=q,n.shuffle=L,n.sum=S,n.ticks=s,n.tickStep=g,n.transpose=j,n.variance=f,n.zip=z,Object.defineProperty(n,"__esModule",{value:!0})});