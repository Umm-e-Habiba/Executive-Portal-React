(window["webpackJsonpshreyu-react"]=window["webpackJsonpshreyu-react"]||[]).push([[27],{109:function(e,t,a){"use strict";var n=a(20);a.d(t,"h",(function(){return n.c})),a.d(t,"i",(function(){return n.f}));var r=a(25);a.d(t,"b",(function(){return r.a})),a.d(t,"c",(function(){return r.b})),a.d(t,"d",(function(){return r.c})),a.d(t,"e",(function(){return r.d})),a.d(t,"f",(function(){return r.e})),a.d(t,"j",(function(){return r.f}));var l=a(37);a.d(t,"a",(function(){return l.a})),a.d(t,"g",(function(){return l.c}))},239:function(e,t,a){e.exports=a.p+"static/media/logo.241a4139.png"},312:function(e,t,a){"use strict";var n=a(27),r=a(28),l=a(30),s=a(29),c=a(0),o=a.n(c),i=function(e){Object(l.a)(a,e);var t=Object(s.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return o.a.createElement("div",{className:"preloader"},o.a.createElement("div",{className:"status"},o.a.createElement("div",{className:"spinner-border avatar-sm text-primary m-2",role:"status"})))}}]),a}(c.Component);t.a=i},657:function(e,t,a){"use strict";a.r(t);var n=a(27),r=a(28),l=a(42),s=a(30),c=a(29),o=a(0),i=a.n(o),m=a(33),u=a(19),d=a(244),p=a(349),h=a(350),f=a(366),E=a(367),b=a(271),v=a(370),g=a(368),y=a(369),w=a(225),N=a(157),O=a(321),j=a(645),x=a(4),k=a.n(x);function A(){return(A=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function T(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var P=function(e){var t=e.color,a=e.size,n=T(e,["color","size"]);return i.a.createElement("svg",A({xmlns:"http://www.w3.org/2000/svg",width:a,height:a,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},n),i.a.createElement("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),i.a.createElement("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}))};P.propTypes={color:k.a.string,size:k.a.oneOfType([k.a.string,k.a.number])},P.defaultProps={color:"currentColor",size:"24"};var R=P,S=a(109),I=a(21),M=a(312),V=a(239),z=a.n(V),F=function(e){Object(s.a)(a,e);var t=Object(c.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e))._isMounted=!1,r.handleValidSubmit=function(e,t){r.props.loginUser(t.username,t.password,r.props.history)},r.renderRedirectToRoot=function(){if(Object(I.b)())return i.a.createElement(u.a,{to:"/"})},r.handleValidSubmit=r.handleValidSubmit.bind(Object(l.a)(r)),r.state={username:"",password:""},r}return Object(r.a)(a,[{key:"componentDidMount",value:function(){this._isMounted=!0,document.body.classList.add("authentication-bg")}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,document.body.classList.remove("authentication-bg")}},{key:"render",value:function(){var e=Object(I.b)();return i.a.createElement(i.a.Fragment,null,this.renderRedirectToRoot(),(this._isMounted||!e)&&i.a.createElement("div",{className:"account-pages my-5"},i.a.createElement(d.a,null,i.a.createElement(p.a,{className:"justify-content-center"},i.a.createElement(h.a,{xl:10},i.a.createElement(f.a,{className:""},i.a.createElement(E.a,{className:"p-0"},i.a.createElement(p.a,null,i.a.createElement(h.a,{md:6,className:"p-5 position-relative"},this.props.loading&&i.a.createElement(M.a,null),i.a.createElement("div",{className:"mx-auto mb-5"},i.a.createElement("a",{href:"/"},i.a.createElement("img",{src:z.a,alt:"",height:"24"}),i.a.createElement("h3",{className:"d-inline align-middle ml-1 text-logo"},"Attari Admin"))),i.a.createElement("h6",{className:"h5 mb-0 mt-4"},"Welcome back!"),i.a.createElement("p",{className:"text-muted mt-1 mb-4"},"Enter your email address and password to access admin panel."),this.props.error&&i.a.createElement(b.a,{color:"danger",isOpen:!!this.props.error},i.a.createElement("div",null,this.props.error)),i.a.createElement(O.AvForm,{onValidSubmit:this.handleValidSubmit,className:"authentication-form"},i.a.createElement(O.AvGroup,{className:""},i.a.createElement(v.a,{for:"username"},"Username"),i.a.createElement(g.a,null,i.a.createElement(y.a,{addonType:"prepend"},i.a.createElement("span",{className:"input-group-text"},i.a.createElement(j.a,{className:"icon-dual"}))),i.a.createElement(O.AvInput,{type:"text",name:"username",id:"username",placeholder:"Enter your username",value:this.state.username,required:!0})),i.a.createElement(O.AvFeedback,null,"This field is invalid")),i.a.createElement(O.AvGroup,{className:"mb-3"},i.a.createElement(v.a,{for:"password"},"Password"),i.a.createElement(g.a,null,i.a.createElement(y.a,{addonType:"prepend"},i.a.createElement("span",{className:"input-group-text"},i.a.createElement(R,{className:"icon-dual"}))),i.a.createElement(O.AvInput,{type:"password",name:"password",id:"password",placeholder:"Enter your password",value:this.state.password,required:!0})),i.a.createElement(O.AvFeedback,null,"This field is invalid")),i.a.createElement(w.a,{className:"form-group mb-0 text-center"},i.a.createElement(N.a,{color:"primary",className:"btn-block"},"Log In")))),i.a.createElement(h.a,{md:6,className:"d-none d-md-inline-block"},i.a.createElement("div",{className:"auth-page-sidebar"},i.a.createElement("div",{className:"overlay"}),i.a.createElement("div",{className:"auth-user-testimonial"},i.a.createElement("p",{className:"font-size-24 font-weight-bold text-white mb-1"},"ATTARI GROUP OF COMPANIES"),i.a.createElement("p",{className:"lead"},'"Price is what you pay. Value is what you get."'),i.a.createElement("p",null,"- Warren Buffett"))))))))),i.a.createElement(p.a,{className:"mt-3"},i.a.createElement(h.a,{className:"col-12 text-center"},"".concat((new Date).getFullYear())," \xa9 Attari Admin. All Rights Reserved. Developed with ",i.a.createElement("i",{className:"uil uil-heart text-danger font-size-12"})," by Core Infinite.")))))}}]),a}(o.Component);t.default=Object(m.b)((function(e){var t=e.Auth;return{user:t.user,loading:t.loading,error:t.error}}),{loginUser:S.h})(F)}}]);
//# sourceMappingURL=27.3e7ac017.chunk.js.map