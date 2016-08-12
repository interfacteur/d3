// https://d3js.org/d3-brush/ Version 1.0.2. Copyright 2016 Mike Bostock.
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("d3-dispatch"),require("d3-drag"),require("d3-interpolate"),require("d3-selection"),require("d3-transition")):"function"==typeof define&&define.amd?define(["exports","d3-dispatch","d3-drag","d3-interpolate","d3-selection","d3-transition"],e):e(t.d3=t.d3||{},t.d3,t.d3,t.d3,t.d3,t.d3)}(this,function(t,e,n,r,s,i){"use strict";function a(t){return function(){return t}}function u(t,e,n){this.target=t,this.type=e,this.selection=n}function o(){s.event.stopImmediatePropagation()}function l(){s.event.preventDefault(),s.event.stopImmediatePropagation()}function c(t){return{type:t}}function h(){return!s.event.button}function f(){var t=this.ownerSVGElement||this;return[[0,0],[t.width.baseVal.value,t.height.baseVal.value]]}function p(t){for(;!t.__brush;)if(!(t=t.parentNode))return;return t.__brush}function d(t){return t[0][0]===t[1][0]||t[0][1]===t[1][1]}function v(t){var e=t.__brush;return e?e.dim.output(e.selection):null}function m(){return w(k)}function y(){return w(z)}function b(){return w(A)}function w(t){function v(e){var n=e.property("__brush",A).selectAll(".overlay").data([c("overlay")]);n.enter().append("rect").attr("class","overlay").attr("pointer-events","all").attr("cursor",q.overlay).merge(n).each(function(){var t=p(this).extent;s.select(this).attr("x",t[0][0]).attr("y",t[0][1]).attr("width",t[1][0]-t[0][0]).attr("height",t[1][1]-t[0][1])}),e.selectAll(".selection").data([c("selection")]).enter().append("rect").attr("class","selection").attr("cursor",q.selection).attr("fill","#777").attr("fill-opacity",.3).attr("stroke","#fff").attr("shape-rendering","crispEdges");var r=e.selectAll(".handle").data(t.handles,function(t){return t.type});r.exit().remove(),r.enter().append("rect").attr("class",function(t){return"handle handle--"+t.type}).attr("cursor",function(t){return q[t.type]}),e.each(m).attr("fill","none").attr("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush touchstart.brush",w)}function m(){var t=s.select(this),e=p(this).selection;e?(t.selectAll(".selection").style("display",null).attr("x",e[0][0]).attr("y",e[0][1]).attr("width",e[1][0]-e[0][0]).attr("height",e[1][1]-e[0][1]),t.selectAll(".handle").style("display",null).attr("x",function(t){return"e"===t.type[t.type.length-1]?e[1][0]-D/2:e[0][0]-D/2}).attr("y",function(t){return"s"===t.type[0]?e[1][1]-D/2:e[0][1]-D/2}).attr("width",function(t){return"n"===t.type||"s"===t.type?e[1][0]-e[0][0]+D:D}).attr("height",function(t){return"e"===t.type||"w"===t.type?e[1][1]-e[0][1]+D:D})):t.selectAll(".selection,.handle").style("display","none").attr("x",null).attr("y",null).attr("width",null).attr("height",null)}function y(t,e){return t.__brush.emitter||new b(t,e)}function b(t,e){this.that=t,this.args=e,this.state=t.__brush,this.active=0}function w(){function e(){var t=s.mouse(X);!$||N||O||(Math.abs(t[0]-et[0])>Math.abs(t[1]-et[1])?O=!0:N=!0),et=t,G=!0,l(),r()}function r(){var t;switch(D=et[0]-tt[0],I=et[1]-tt[1],B){case x:case g:F&&(D=Math.max(R-h,Math.min(W-w,D)),f=h+D,A=w+D),H&&(I=Math.max(U-v,Math.min(Z-V,I)),b=v+I,C=V+I);break;case _:F<0?(D=Math.max(R-h,Math.min(W-h,D)),f=h+D,A=w):F>0&&(D=Math.max(R-w,Math.min(W-w,D)),f=h,A=w+D),H<0?(I=Math.max(U-v,Math.min(Z-v,I)),b=v+I,C=V):H>0&&(I=Math.max(U-V,Math.min(Z-V,I)),b=v,C=V+I);break;case M:F&&(f=Math.max(R,Math.min(W,h-D*F)),A=Math.max(R,Math.min(W,w+D*F))),H&&(b=Math.max(U,Math.min(Z,v-I*H)),C=Math.max(U,Math.min(Z,V+I*H)))}A<f&&(F*=-1,t=h,h=w,w=t,t=f,f=A,A=t,Y in E&&st.attr("cursor",q[Y=E[Y]])),C<b&&(H*=-1,t=v,v=V,V=t,t=b,b=C,C=t,Y in K&&st.attr("cursor",q[Y=K[Y]])),Q=J.selection,N&&(f=Q[0][0],A=Q[1][0]),O&&(b=Q[0][1],C=Q[1][1]),Q[0][0]===f&&Q[0][1]===b&&Q[1][0]===A&&Q[1][1]===C||(J.selection=[[f,b],[A,C]],m.call(X),nt.brush())}function a(){if(o(),s.event.touches){if(s.event.touches.length)return;T&&clearTimeout(T),T=setTimeout(function(){T=null},500),rt.on("touchmove.brush touchend.brush touchcancel.brush",null)}else n.dragEnable(s.event.view,G),it.on("keydown.brush keyup.brush mousemove.brush mouseup.brush",null);rt.attr("pointer-events","all"),st.attr("cursor",q.overlay),d(Q)&&(J.selection=null,m.call(X)),nt.end()}function u(){switch(s.event.keyCode){case 16:$=F&&H;break;case 18:B===_&&(F&&(w=A-D*F,h=f+D*F),H&&(V=C-I*H,v=b+I*H),B=M,r());break;case 32:B!==_&&B!==M||(F<0?w=A-D:F>0&&(h=f-D),H<0?V=C-I:H>0&&(v=b-I),B=x,st.attr("cursor",q.selection),r());break;default:return}l()}function c(){switch(s.event.keyCode){case 16:$&&(N=O=$=!1,r());break;case 18:B===M&&(F<0?w=A:F>0&&(h=f),H<0?V=C:H>0&&(v=b),B=_,r());break;case 32:B===x&&(s.event.altKey?(F&&(w=A-D*F,h=f+D*F),H&&(V=C-I*H,v=b+I*H),B=M):(F<0?w=A:F>0&&(h=f),H<0?V=C:H>0&&(v=b),B=_),st.attr("cursor",q[Y]),r());break;default:return}l()}if(s.event.touches){if(s.event.changedTouches.length<s.event.touches.length)return l()}else if(T)return;if(j.apply(this,arguments)){var h,f,v,b,w,A,V,C,D,I,G,N,O,X=this,Y=s.event.target.__data__.type,B="selection"===(s.event.metaKey?Y="overlay":Y)?g:s.event.altKey?M:_,F=t===z?null:P[Y],H=t===k?null:S[Y],J=p(X),L=J.extent,Q=J.selection,R=L[0][0],U=L[0][1],W=L[1][0],Z=L[1][1],$=F&&H&&s.event.shiftKey,tt=s.mouse(X),et=tt,nt=y(X,arguments).beforestart();"overlay"===Y?J.selection=Q=[[h=t===z?R:tt[0],v=t===k?U:tt[1]],[w=t===z?W:h,V=t===k?Z:v]]:(h=Q[0][0],v=Q[0][1],w=Q[1][0],V=Q[1][1]),f=h,b=v,A=w,C=V;var rt=s.select(X).attr("pointer-events","none"),st=rt.selectAll(".overlay").attr("cursor",q[Y]);if(s.event.touches)rt.on("touchmove.brush",e,!0).on("touchend.brush touchcancel.brush",a,!0);else{var it=s.select(s.event.view).on("keydown.brush",u,!0).on("keyup.brush",c,!0).on("mousemove.brush",e,!0).on("mouseup.brush",a,!0);n.dragDisable(s.event.view)}o(),i.interrupt(X),m.call(X),nt.start()}}function A(){var e=this.__brush||{selection:null};return e.extent=V.apply(this,arguments),e.dim=t,e}var T,V=f,j=h,C=e.dispatch(v,"start","brush","end"),D=6;return v.move=function(e,n){e.selection?e.on("start.brush",function(){y(this,arguments).beforestart().start()}).on("interrupt.brush end.brush",function(){y(this,arguments).end()}).tween("brush",function(){function e(t){i.selection=1===t&&d(o)?null:l(t),m.call(s),a.brush()}var s=this,i=s.__brush,a=y(s,arguments),u=i.selection,o=t.input("function"==typeof n?n.apply(this,arguments):n,i.extent),l=r.interpolate(u,o);return u&&o?e:e(1)}):e.each(function(){var e=this,r=arguments,s=e.__brush,a=t.input("function"==typeof n?n.apply(e,r):n,s.extent),u=y(e,r).beforestart();i.interrupt(e),s.selection=null==a||d(a)?null:a,m.call(e),u.start().brush().end()})},b.prototype={beforestart:function(){return 1===++this.active&&(this.state.emitter=this,this.starting=!0),this},start:function(){return this.starting&&(this.starting=!1,this.emit("start")),this},brush:function(){return this.emit("brush"),this},end:function(){return 0===--this.active&&(delete this.state.emitter,this.emit("end")),this},emit:function(e){s.customEvent(new u(v,e,t.output(this.state.selection)),C.apply,C,[e,this.that,this.args])}},v.extent=function(t){return arguments.length?(V="function"==typeof t?t:a([[+t[0][0],+t[0][1]],[+t[1][0],+t[1][1]]]),v):V},v.filter=function(t){return arguments.length?(j="function"==typeof t?t:a(!!t),v):j},v.handleSize=function(t){return arguments.length?(D=+t,v):D},v.on=function(){var t=C.on.apply(C,arguments);return t===C?v:t},v}var g={name:"drag"},x={name:"space"},_={name:"handle"},M={name:"center"},k={name:"x",handles:["e","w"].map(c),input:function(t,e){return t&&[[t[0],e[0][1]],[t[1],e[1][1]]]},output:function(t){return t&&[t[0][0],t[1][0]]}},z={name:"y",handles:["n","s"].map(c),input:function(t,e){return t&&[[e[0][0],t[0]],[e[1][0],t[1]]]},output:function(t){return t&&[t[0][1],t[1][1]]}},A={name:"xy",handles:["n","e","s","w","nw","ne","se","sw"].map(c),input:function(t){return t},output:function(t){return t}},q={overlay:"crosshair",selection:"move",n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},E={e:"w",w:"e",nw:"ne",ne:"nw",se:"sw",sw:"se"},K={n:"s",s:"n",nw:"sw",ne:"se",se:"ne",sw:"nw"},P={overlay:1,selection:1,n:null,e:1,s:null,w:-1,nw:-1,ne:1,se:1,sw:-1},S={overlay:1,selection:1,n:-1,e:null,s:1,w:null,nw:-1,ne:-1,se:1,sw:1};t.brush=b,t.brushX=m,t.brushY=y,t.brushSelection=v,Object.defineProperty(t,"__esModule",{value:!0})});