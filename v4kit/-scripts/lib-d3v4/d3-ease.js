// https://d3js.org/d3-ease/ Version 1.0.1. Copyright 2016 Mike Bostock.
!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(n.d3=n.d3||{})}(this,function(n){"use strict";function t(n){return+n}function e(n){return n*n}function u(n){return n*(2-n)}function r(n){return((n*=2)<=1?n*n:--n*(2-n)+1)/2}function a(n){return n*n*n}function o(n){return--n*n*n+1}function i(n){return((n*=2)<=1?n*n*n:(n-=2)*n*n+2)/2}function c(n){return 1-Math.cos(n*E)}function s(n){return Math.sin(n*E)}function f(n){return(1-Math.cos(C*n))/2}function h(n){return Math.pow(2,10*n-10)}function p(n){return 1-Math.pow(2,-10*n)}function M(n){return((n*=2)<=1?Math.pow(2,10*n-10):2-Math.pow(2,10-10*n))/2}function d(n){return 1-Math.sqrt(1-n*n)}function I(n){return Math.sqrt(1- --n*n)}function O(n){return((n*=2)<=1?1-Math.sqrt(1-n*n):Math.sqrt(1-(n-=2)*n)+1)/2}function l(n){return 1-x(1-n)}function x(n){return(n=+n)<P?g*n*n:n<k?g*(n-=b)*n+q:n<S?g*(n-=Q)*n+j:g*(n-=_)*n+L}function w(n){return((n*=2)<=1?1-x(1-n):x(n-1)+1)/2}var m=3,v=function n(t){function e(n){return Math.pow(n,t)}return t=+t,e.exponent=n,e}(m),y=function n(t){function e(n){return 1-Math.pow(1-n,t)}return t=+t,e.exponent=n,e}(m),B=function n(t){function e(n){return((n*=2)<=1?Math.pow(n,t):2-Math.pow(2-n,t))/2}return t=+t,e.exponent=n,e}(m),C=Math.PI,E=C/2,P=4/11,b=6/11,k=8/11,q=.75,Q=9/11,S=10/11,j=.9375,_=21/22,L=63/64,g=1/P/P,z=1.70158,A=function n(t){function e(n){return n*n*((t+1)*n-t)}return t=+t,e.overshoot=n,e}(z),D=function n(t){function e(n){return--n*n*((t+1)*n+t)+1}return t=+t,e.overshoot=n,e}(z),F=function n(t){function e(n){return((n*=2)<1?n*n*((t+1)*n-t):(n-=2)*n*((t+1)*n+t)+2)/2}return t=+t,e.overshoot=n,e}(z),G=2*Math.PI,H=1,J=.3,K=function n(t,e){function u(n){return t*Math.pow(2,10*--n)*Math.sin((r-n)/e)}var r=Math.asin(1/(t=Math.max(1,t)))*(e/=G);return u.amplitude=function(t){return n(t,e*G)},u.period=function(e){return n(t,e)},u}(H,J),N=function n(t,e){function u(n){return 1-t*Math.pow(2,-10*(n=+n))*Math.sin((n+r)/e)}var r=Math.asin(1/(t=Math.max(1,t)))*(e/=G);return u.amplitude=function(t){return n(t,e*G)},u.period=function(e){return n(t,e)},u}(H,J),R=function n(t,e){function u(n){return((n=2*n-1)<0?t*Math.pow(2,10*n)*Math.sin((r-n)/e):2-t*Math.pow(2,-10*n)*Math.sin((r+n)/e))/2}var r=Math.asin(1/(t=Math.max(1,t)))*(e/=G);return u.amplitude=function(t){return n(t,e*G)},u.period=function(e){return n(t,e)},u}(H,J);n.easeLinear=t,n.easeQuad=r,n.easeQuadIn=e,n.easeQuadOut=u,n.easeQuadInOut=r,n.easeCubic=i,n.easeCubicIn=a,n.easeCubicOut=o,n.easeCubicInOut=i,n.easePoly=B,n.easePolyIn=v,n.easePolyOut=y,n.easePolyInOut=B,n.easeSin=f,n.easeSinIn=c,n.easeSinOut=s,n.easeSinInOut=f,n.easeExp=M,n.easeExpIn=h,n.easeExpOut=p,n.easeExpInOut=M,n.easeCircle=O,n.easeCircleIn=d,n.easeCircleOut=I,n.easeCircleInOut=O,n.easeBounce=x,n.easeBounceIn=l,n.easeBounceOut=x,n.easeBounceInOut=w,n.easeBack=F,n.easeBackIn=A,n.easeBackOut=D,n.easeBackInOut=F,n.easeElastic=N,n.easeElasticIn=K,n.easeElasticOut=N,n.easeElasticInOut=R,Object.defineProperty(n,"__esModule",{value:!0})});