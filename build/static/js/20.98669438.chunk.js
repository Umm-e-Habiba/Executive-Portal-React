(window["webpackJsonpshreyu-react"]=window["webpackJsonpshreyu-react"]||[]).push([[20],{108:function(e,a,t){e.exports=t.p+"static/media/no-data.fec8971f.svg"},159:function(e,a,t){"use strict";var n=t(8),s=t(11),o=t(0),l=t.n(o),r=t(4),c=t.n(r),i=t(75),m=t.n(i),d=t(76),u={tag:d.tagPropType,wrapTag:d.tagPropType,toggle:c.a.func,className:c.a.string,cssModule:c.a.object,children:c.a.node,closeAriaLabel:c.a.string,charCode:c.a.oneOfType([c.a.string,c.a.number]),close:c.a.object},p=function(e){var a,t=e.className,o=e.cssModule,r=e.children,c=e.toggle,i=e.tag,u=e.wrapTag,p=e.closeAriaLabel,h=e.charCode,b=e.close,g=Object(s.a)(e,["className","cssModule","children","toggle","tag","wrapTag","closeAriaLabel","charCode","close"]),f=Object(d.mapToCssModules)(m()(t,"modal-header"),o);if(!b&&c){var E="number"===typeof h?String.fromCharCode(h):h;a=l.a.createElement("button",{type:"button",onClick:c,className:Object(d.mapToCssModules)("close",o),"aria-label":p},l.a.createElement("span",{"aria-hidden":"true"},E))}return l.a.createElement(u,Object(n.a)({},g,{className:f}),l.a.createElement(i,{className:Object(d.mapToCssModules)("modal-title",o)},r),b||a)};p.propTypes=u,p.defaultProps={tag:"h5",wrapTag:"div",closeAriaLabel:"Close",charCode:215},a.a=p},160:function(e,a,t){"use strict";var n=t(8),s=t(11),o=t(0),l=t.n(o),r=t(4),c=t.n(r),i=t(75),m=t.n(i),d=t(76),u={tag:d.tagPropType,className:c.a.string,cssModule:c.a.object},p=function(e){var a=e.className,t=e.cssModule,o=e.tag,r=Object(s.a)(e,["className","cssModule","tag"]),c=Object(d.mapToCssModules)(m()(a,"modal-body"),t);return l.a.createElement(o,Object(n.a)({},r,{className:c}))};p.propTypes=u,p.defaultProps={tag:"div"},a.a=p},161:function(e,a,t){"use strict";var n=t(8),s=t(11),o=t(0),l=t.n(o),r=t(4),c=t.n(r),i=t(75),m=t.n(i),d=t(76),u={tag:d.tagPropType,className:c.a.string,cssModule:c.a.object},p=function(e){var a=e.className,t=e.cssModule,o=e.tag,r=Object(s.a)(e,["className","cssModule","tag"]),c=Object(d.mapToCssModules)(m()(a,"modal-footer"),t);return l.a.createElement(o,Object(n.a)({},r,{className:c}))};p.propTypes=u,p.defaultProps={tag:"div"},a.a=p},163:function(e,a,t){"use strict";var n=t(8),s=t(11),o=t(0),l=t.n(o),r=t(4),c=t.n(r),i=t(75),m=t.n(i),d=t(76),u={body:c.a.bool,bottom:c.a.bool,children:c.a.node,className:c.a.string,cssModule:c.a.object,heading:c.a.bool,left:c.a.bool,list:c.a.bool,middle:c.a.bool,object:c.a.bool,right:c.a.bool,tag:d.tagPropType,top:c.a.bool},p=function(e){var a,t=e.body,o=e.bottom,r=e.className,c=e.cssModule,i=e.heading,u=e.left,p=e.list,h=e.middle,b=e.object,g=e.right,f=e.tag,E=e.top,y=Object(s.a)(e,["body","bottom","className","cssModule","heading","left","list","middle","object","right","tag","top"]);a=i?"h4":y.href?"a":y.src||b?"img":p?"ul":"div";var N=f||a,v=Object(d.mapToCssModules)(m()(r,{"media-body":t,"media-heading":i,"media-left":u,"media-right":g,"media-top":E,"media-bottom":o,"media-middle":h,"media-object":b,"media-list":p,media:!t&&!i&&!u&&!g&&!E&&!o&&!h&&!b&&!p}),c);return l.a.createElement(N,Object(n.a)({},y,{className:v}))};p.propTypes=u,a.a=p},219:function(e,a,t){"use strict";var n=t(81),s=t(8),o=t(78),l=t(12),r=t(0),c=t.n(r),i=t(4),m=t.n(i),d=t(75),u=t.n(d),p=t(32),h=t.n(p),b=t(76),g={children:m.a.node.isRequired,node:m.a.any},f=function(e){function a(){return e.apply(this,arguments)||this}Object(l.a)(a,e);var t=a.prototype;return t.componentWillUnmount=function(){this.defaultNode&&document.body.removeChild(this.defaultNode),this.defaultNode=null},t.render=function(){return b.canUseDOM?(this.props.node||this.defaultNode||(this.defaultNode=document.createElement("div"),document.body.appendChild(this.defaultNode)),h.a.createPortal(this.props.children,this.props.node||this.defaultNode)):null},a}(c.a.Component);f.propTypes=g;var E=f,y=t(86);function N(){}var v=m.a.shape(y.a.propTypes),C={isOpen:m.a.bool,autoFocus:m.a.bool,centered:m.a.bool,scrollable:m.a.bool,size:m.a.string,toggle:m.a.func,keyboard:m.a.bool,role:m.a.string,labelledBy:m.a.string,backdrop:m.a.oneOfType([m.a.bool,m.a.oneOf(["static"])]),onEnter:m.a.func,onExit:m.a.func,onOpened:m.a.func,onClosed:m.a.func,children:m.a.node,className:m.a.string,wrapClassName:m.a.string,modalClassName:m.a.string,backdropClassName:m.a.string,contentClassName:m.a.string,external:m.a.node,fade:m.a.bool,cssModule:m.a.object,zIndex:m.a.oneOfType([m.a.number,m.a.string]),backdropTransition:v,modalTransition:v,innerRef:m.a.oneOfType([m.a.object,m.a.string,m.a.func]),unmountOnClose:m.a.bool,returnFocusAfterClose:m.a.bool},O=Object.keys(C),j={isOpen:!1,autoFocus:!0,centered:!1,scrollable:!1,role:"dialog",backdrop:!0,keyboard:!0,zIndex:1050,fade:!0,onOpened:N,onClosed:N,modalTransition:{timeout:b.TransitionTimeouts.Modal},backdropTransition:{mountOnEnter:!0,timeout:b.TransitionTimeouts.Fade},unmountOnClose:!0,returnFocusAfterClose:!0},M=function(e){function a(a){var t;return(t=e.call(this,a)||this)._element=null,t._originalBodyPadding=null,t.getFocusableChildren=t.getFocusableChildren.bind(Object(o.a)(t)),t.handleBackdropClick=t.handleBackdropClick.bind(Object(o.a)(t)),t.handleBackdropMouseDown=t.handleBackdropMouseDown.bind(Object(o.a)(t)),t.handleEscape=t.handleEscape.bind(Object(o.a)(t)),t.handleTab=t.handleTab.bind(Object(o.a)(t)),t.onOpened=t.onOpened.bind(Object(o.a)(t)),t.onClosed=t.onClosed.bind(Object(o.a)(t)),t.manageFocusAfterClose=t.manageFocusAfterClose.bind(Object(o.a)(t)),t.state={isOpen:!1},t}Object(l.a)(a,e);var t=a.prototype;return t.componentDidMount=function(){var e=this.props,a=e.isOpen,t=e.autoFocus,n=e.onEnter;a&&(this.init(),this.setState({isOpen:!0}),t&&this.setFocus()),n&&n(),this._isMounted=!0},t.componentDidUpdate=function(e,a){if(this.props.isOpen&&!e.isOpen)return this.init(),void this.setState({isOpen:!0});this.props.autoFocus&&this.state.isOpen&&!a.isOpen&&this.setFocus(),this._element&&e.zIndex!==this.props.zIndex&&(this._element.style.zIndex=this.props.zIndex)},t.componentWillUnmount=function(){this.props.onExit&&this.props.onExit(),this._element&&(this.destroy(),this.state.isOpen&&this.close()),this._isMounted=!1},t.onOpened=function(e,a){this.props.onOpened(),(this.props.modalTransition.onEntered||N)(e,a)},t.onClosed=function(e){var a=this.props.unmountOnClose;this.props.onClosed(),(this.props.modalTransition.onExited||N)(e),a&&this.destroy(),this.close(),this._isMounted&&this.setState({isOpen:!1})},t.setFocus=function(){this._dialog&&this._dialog.parentNode&&"function"===typeof this._dialog.parentNode.focus&&this._dialog.parentNode.focus()},t.getFocusableChildren=function(){return this._element.querySelectorAll(b.focusableElements.join(", "))},t.getFocusedChild=function(){var e,a=this.getFocusableChildren();try{e=document.activeElement}catch(t){e=a[0]}return e},t.handleBackdropClick=function(e){if(e.target===this._mouseDownElement){if(e.stopPropagation(),!this.props.isOpen||!0!==this.props.backdrop)return;var a=this._dialog?this._dialog.parentNode:null;a&&e.target===a&&this.props.toggle&&this.props.toggle(e)}},t.handleTab=function(e){if(9===e.which){var a=this.getFocusableChildren(),t=a.length;if(0!==t){for(var n=this.getFocusedChild(),s=0,o=0;o<t;o+=1)if(a[o]===n){s=o;break}e.shiftKey&&0===s?(e.preventDefault(),a[t-1].focus()):e.shiftKey||s!==t-1||(e.preventDefault(),a[0].focus())}}},t.handleBackdropMouseDown=function(e){this._mouseDownElement=e.target},t.handleEscape=function(e){this.props.isOpen&&this.props.keyboard&&27===e.keyCode&&this.props.toggle&&(e.preventDefault(),e.stopPropagation(),this.props.toggle(e))},t.init=function(){try{this._triggeringElement=document.activeElement}catch(e){this._triggeringElement=null}this._element||(this._element=document.createElement("div"),this._element.setAttribute("tabindex","-1"),this._element.style.position="relative",this._element.style.zIndex=this.props.zIndex,document.body.appendChild(this._element)),this._originalBodyPadding=Object(b.getOriginalBodyPadding)(),Object(b.conditionallyUpdateScrollbar)(),0===a.openCount&&(document.body.className=u()(document.body.className,Object(b.mapToCssModules)("modal-open",this.props.cssModule))),a.openCount+=1},t.destroy=function(){this._element&&(document.body.removeChild(this._element),this._element=null),this.manageFocusAfterClose()},t.manageFocusAfterClose=function(){if(this._triggeringElement){var e=this.props.returnFocusAfterClose;this._triggeringElement.focus&&e&&this._triggeringElement.focus(),this._triggeringElement=null}},t.close=function(){if(a.openCount<=1){var e=Object(b.mapToCssModules)("modal-open",this.props.cssModule),t=new RegExp("(^| )"+e+"( |$)");document.body.className=document.body.className.replace(t," ").trim()}this.manageFocusAfterClose(),a.openCount=Math.max(0,a.openCount-1),Object(b.setScrollbarWidth)(this._originalBodyPadding)},t.renderModalDialog=function(){var e,a=this,t=Object(b.omit)(this.props,O);return c.a.createElement("div",Object(s.a)({},t,{className:Object(b.mapToCssModules)(u()("modal-dialog",this.props.className,(e={},e["modal-"+this.props.size]=this.props.size,e["modal-dialog-centered"]=this.props.centered,e["modal-dialog-scrollable"]=this.props.scrollable,e)),this.props.cssModule),role:"document",ref:function(e){a._dialog=e}}),c.a.createElement("div",{className:Object(b.mapToCssModules)(u()("modal-content",this.props.contentClassName),this.props.cssModule)},this.props.children))},t.render=function(){var e=this.props.unmountOnClose;if(this._element&&(this.state.isOpen||!e)){var a=!!this._element&&!this.state.isOpen&&!e;this._element.style.display=a?"none":"block";var t=this.props,o=t.wrapClassName,l=t.modalClassName,r=t.backdropClassName,i=t.cssModule,m=t.isOpen,d=t.backdrop,p=t.role,h=t.labelledBy,g=t.external,f=t.innerRef,N={onClick:this.handleBackdropClick,onMouseDown:this.handleBackdropMouseDown,onKeyUp:this.handleEscape,onKeyDown:this.handleTab,style:{display:"block"},"aria-labelledby":h,role:p,tabIndex:"-1"},v=this.props.fade,C=Object(n.a)({},y.a.defaultProps,this.props.modalTransition,{baseClass:v?this.props.modalTransition.baseClass:"",timeout:v?this.props.modalTransition.timeout:0}),O=Object(n.a)({},y.a.defaultProps,this.props.backdropTransition,{baseClass:v?this.props.backdropTransition.baseClass:"",timeout:v?this.props.backdropTransition.timeout:0}),j=d&&(v?c.a.createElement(y.a,Object(s.a)({},O,{in:m&&!!d,cssModule:i,className:Object(b.mapToCssModules)(u()("modal-backdrop",r),i)})):c.a.createElement("div",{className:Object(b.mapToCssModules)(u()("modal-backdrop","show",r),i)}));return c.a.createElement(E,{node:this._element},c.a.createElement("div",{className:Object(b.mapToCssModules)(o)},c.a.createElement(y.a,Object(s.a)({},N,C,{in:m,onEntered:this.onOpened,onExited:this.onClosed,cssModule:i,className:Object(b.mapToCssModules)(u()("modal",l),i),innerRef:f}),g,this.renderModalDialog()),j))}return null},a}(c.a.Component);M.propTypes=C,M.defaultProps=j,M.openCount=0;a.a=M},316:function(e,a,t){e.exports=t.p+"static/media/employee-male.ca564f74.svg"},624:function(e,a,t){e.exports=t.p+"static/media/visitor.bdd5e148.svg"},648:function(e,a,t){"use strict";t.r(a);var n=t(3),s=t.n(n),o=t(136),l=t(27),r=t(28),c=t(42),i=t(30),m=t(29),d=t(0),u=t.n(d),p=t(110),h=t.n(p),b=t(349),g=t(350),f=t(366),E=t(367),y=t(157),N=t(219),v=t(159),C=t(160),O=t(163),j=t(161),M=t(244),T=t(137),w=t.n(T),k=t(89),x=t(90),F=t(108),_=t.n(F),D=t(316),P=t.n(D),S=t(624),R=t.n(S),A=function(e){var a=e.employees,t=e.showModals,n=e.toggleModal;return u.a.createElement(u.a.Fragment,null,u.a.createElement(b.a,null,a.map((function(e,a){var s,o=e.Reviews.length,l=((null!==(s=e.AverageRating)&&void 0!==s?s:0)/20).toFixed(1),r=l>4?"success":l>2.5?"info":l>1.5?"warning":"danger";return 0===o&&(l="Unrated",r="secondary"),u.a.createElement(g.a,{lg:6,xl:4,key:"cash-plot-".concat(e.RowNumber)},u.a.createElement(f.a,null,u.a.createElement(E.a,{className:"pb-0"},u.a.createElement("div",{className:"text-center mt-3"},u.a.createElement("img",{src:P.a,alt:"",className:"avatar-xl rounded-circle"}),u.a.createElement("h5",{className:"mt-2 mb-0"},e.Name),u.a.createElement("h6",{className:"text-muted font-weight-normal mt-2 mb-0"},e.Designation),e.IsIMSUser?u.a.createElement("h6",{className:"text-muted font-weight-normal mt-2 mb-0"},u.a.createElement("span",{className:"badge badge-soft-success py-1 ml-2"},u.a.createElement("span",{className:"fas fa-desktop mr-1"}),"IMS User")):u.a.createElement("h6",{className:"text-muted font-weight-normal mt-2 mb-0"},u.a.createElement("span",{className:"badge badge-soft-secondary py-1 ml-2"},u.a.createElement("span",{className:"fas fa-user mr-1"}),"Regular")),u.a.createElement("h6",{className:"text-muted font-weight-normal mt-2 mb-4"},u.a.createElement("span",{className:"badge badge-soft-".concat("Unknown"===e.Role?"secondary":"primary"," py-1")},u.a.createElement("span",{className:"fas fa-shield-alt mr-2"}),e.Role),u.a.createElement("span",{className:"badge badge-soft-".concat(r," py-1 ml-2")},u.a.createElement("span",{className:"fas fa-star mr-1"}),l)),u.a.createElement("a",{href:"https://api.whatsapp.com/send?phone=".concat(e.PhoneNo),rel:"noopener noreferrer",target:"_blank",className:"btn btn-success btn-sm mr-1"},u.a.createElement("span",{className:"fab fa-whatsapp mr-2"}),"Message")),u.a.createElement("div",{className:"mt-3 pt-2 border-top"},u.a.createElement("h4",{className:"mb-3 font-size-15"},"Employee Details"),u.a.createElement("div",{className:"table-responsive"},u.a.createElement("table",{className:"table table-borderless mb-0 text-muted"},u.a.createElement("tbody",null,u.a.createElement("tr",null,u.a.createElement("th",{scope:"row"},"Username"),u.a.createElement("td",null,e.Username?"@".concat(e.Username.toLowerCase()):"@anonymous")),u.a.createElement("tr",null,u.a.createElement("th",{scope:"row"},"Contact Number"),u.a.createElement("td",null,e.PhoneNo)),u.a.createElement("tr",null,u.a.createElement("th",{scope:"row"},"Total Reviews"),u.a.createElement("td",null,u.a.createElement("span",{className:"badge badge-info"},o.toLocaleString()))))))),u.a.createElement("div",{className:"mt-4 mb-4 pt-3 border-top text-left"},u.a.createElement(y.a,{color:"outline-info",className:"btn-block",disabled:0===o,onClick:function(){return n(a)}},"Reviews and Ratings")),o>0&&u.a.createElement(N.a,{className:"bg-light",isOpen:t[a],toggle:function(){return n(a)},size:"md"},u.a.createElement(v.a,{toggle:function(){return n(a)}},"Reviews for @".concat(e.Username.toLowerCase())),u.a.createElement(C.a,null,u.a.createElement(f.a,null,u.a.createElement(E.a,null,u.a.createElement(h.a,{options:{chart:{height:160,type:"line",zoom:{enabled:!1}},colors:["#FEB019"],dataLabels:{enabled:!1},yaxis:{labels:{formatter:function(e){return"".concat(e," Stars")}}}},series:[{name:"Stars",data:e.Reviews.map((function(e){return(e.Rating/20).toFixed(1)}))}],type:"line",height:160}),u.a.createElement("h5",{className:"card-title mb-0 header-title"},"Showing",u.a.createElement("span",{className:"font-size-12 badge badge-success ml-2"},"Top 10")),e.Reviews.map((function(e,a){var t=(e.Rating/20).toFixed(1),n=t>4?"success":t>2.5?"info":t>1.5?"warning":"danger";return u.a.createElement(O.a,{key:a,className:"mt-3"},u.a.createElement("img",{src:R.a,className:"mr-3 avatar rounded-circle",alt:"shreyu"}),u.a.createElement(O.a,{body:!0},u.a.createElement("h6",{className:"text-muted font-weight-normal"},u.a.createElement("span",{className:"badge badge-soft-".concat(n," py-1")},u.a.createElement("span",{className:"fas fa-star mr-1"}),t)),u.a.createElement("h6",{className:"mt-0 mb-0 font-size-15 font-weight-normal"},u.a.createElement("span",{className:"font-weight-bold text-secondary mr-1"},e.VisitorName),"wrote: ",u.a.createElement("span",{className:"font-italic"},e.Review)),u.a.createElement("p",{className:"text-muted"},new Date(e.Date).toLocaleString("en-US",{weekday:"long",day:"numeric",year:"numeric",month:"long",hour:"numeric",minute:"numeric"}))))}))))),u.a.createElement(j.a,null,u.a.createElement(y.a,{color:"secondary",className:"ml-1",onClick:function(){return n(a)}},"Cancel"))))))}))))},I=function(e){Object(i.a)(t,e);var a=Object(m.a)(t);function t(e){var n;return Object(l.a)(this,t),(n=a.call(this,e)).toggleModal=function(e){var a=n.state.ShowModals;a[e]=!a[e],n.setState({ShowModals:a})},n.state={IsDataFetched:!1,IsDataFound:!1,Employees:[],ShowModals:[]},n.toggleModal=n.toggleModal.bind(Object(c.a)(n)),n}return Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=Object(o.a)(s.a.mark((function e(){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,w.a.get("".concat("https://attari-admin-api.herokuapp.com","/khyberCity/employees"));case 3:a=e.sent,this.setState({IsDataFetched:!0}),"Data found."===a.data.Message&&this.setState({IsDataFound:!0,Employees:a.data.Employees,ShowModals:Array.from({length:a.data.Employees.length},(function(){return!1}))}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),this.setState({IsDataFetched:!0});case 11:case"end":return e.stop()}}),e,this,[[0,8]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,a=e.IsDataFetched,t=e.IsDataFound,n=e.Employees,s=e.ShowModals;return t?u.a.createElement(u.a.Fragment,null,u.a.createElement(b.a,{className:"page-title"},u.a.createElement(g.a,{md:12},u.a.createElement(k.a,{breadCrumbItems:[{label:"Khyber City",path:"/khyberCity/sales"},{label:"Employees",path:"/khyberCity/employees",active:!0}],title:"Employees"}))),n.length>0?u.a.createElement(u.a.Fragment,null,u.a.createElement(A,{employees:n,showModals:s,toggleModal:this.toggleModal})):u.a.createElement(M.a,null,u.a.createElement(b.a,{className:"justify-content-center"},u.a.createElement(g.a,{xl:4,lg:5},u.a.createElement("div",{className:"text-center"},u.a.createElement("div",null,u.a.createElement("img",{src:_.a,alt:"",className:"img-fluid"}))))),u.a.createElement(b.a,null,u.a.createElement(g.a,{className:"text-center"},u.a.createElement("h3",{className:"mt-3"},"No employees found."))))):u.a.createElement(x.a,{isDataFetched:a,retryLink:"/khyberCity/employees"})}}]),t}(u.a.Component);a.default=I},86:function(e,a,t){"use strict";var n=t(8),s=t(11),o=t(81),l=t(0),r=t.n(l),c=t(4),i=t.n(c),m=t(75),d=t.n(m),u=t(88),p=t(76),h=Object(o.a)({},u.Transition.propTypes,{children:i.a.oneOfType([i.a.arrayOf(i.a.node),i.a.node]),tag:p.tagPropType,baseClass:i.a.string,baseClassActive:i.a.string,className:i.a.string,cssModule:i.a.object,innerRef:i.a.oneOfType([i.a.object,i.a.string,i.a.func])}),b=Object(o.a)({},u.Transition.defaultProps,{tag:"div",baseClass:"fade",baseClassActive:"show",timeout:p.TransitionTimeouts.Fade,appear:!0,enter:!0,exit:!0,in:!0});function g(e){var a=e.tag,t=e.baseClass,o=e.baseClassActive,l=e.className,c=e.cssModule,i=e.children,m=e.innerRef,h=Object(s.a)(e,["tag","baseClass","baseClassActive","className","cssModule","children","innerRef"]),b=Object(p.pick)(h,p.TransitionPropTypeKeys),g=Object(p.omit)(h,p.TransitionPropTypeKeys);return r.a.createElement(u.Transition,b,(function(e){var s="entered"===e,u=Object(p.mapToCssModules)(d()(l,t,s&&o),c);return r.a.createElement(a,Object(n.a)({className:u},g,{ref:m}),i)}))}g.propTypes=h,g.defaultProps=b,a.a=g},89:function(e,a,t){"use strict";var n=t(0),s=t.n(n),o=t(31),l=t(352),r=t(353);a.a=function(e){var a=e.title||"",t=e.breadCrumbItems||"";return s.a.createElement(s.a.Fragment,null,s.a.createElement(l.a,{className:"float-right mt-1 font-size-14"},s.a.createElement(r.a,null,s.a.createElement(o.b,{to:"/"},"Attari Admin")),t.map((function(e,a){return e.active?s.a.createElement(r.a,{active:!0,key:a},e.label):s.a.createElement(r.a,{key:a},s.a.createElement(o.b,{to:e.path},e.label))}))),s.a.createElement("h4",{className:"mb-1 mt-0"},a))}},90:function(e,a,t){"use strict";var n=t(27),s=t(28),o=t(30),l=t(29),r=t(0),c=t.n(r),i=t(244),m=t(349),d=t(350),u=t(157),p=t(371),h=t(91),b=t.n(h),g=t(92),f=t.n(g),E=["primary","primary","primary"],y=function(e){Object(o.a)(t,e);var a=Object(l.a)(t);function t(e){return Object(n.a)(this,t),a.call(this,e)}return Object(s.a)(t,[{key:"componentDidMount",value:function(){document.body.classList.add("authentication-bg")}},{key:"componentWillUnmount",value:function(){document.body.classList.remove("authentication-bg")}},{key:"render",value:function(){var e=this.props,a=e.isDataFetched;e.retryLink;return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"my-5"},c.a.createElement(i.a,null,a?c.a.createElement("div",null,c.a.createElement(m.a,{className:"justify-content-center"},c.a.createElement(d.a,{xl:4,lg:5},c.a.createElement("div",{className:"text-center"},c.a.createElement("div",null,c.a.createElement("img",{src:b.a,alt:"",className:"img-fluid"}))))),c.a.createElement(m.a,null,c.a.createElement(d.a,{className:"text-center"},c.a.createElement("h3",{className:"mt-3"},"Oops! Something went wrong."),c.a.createElement("p",{className:"text-muted mb-2"},"Failed to fetch data from the server.",c.a.createElement("br",null)," Please try again!"),c.a.createElement(u.a,{className:"btn btn-lg btn-primary mt-4",onClick:function(){window.location.reload()}},"Retry")))):c.a.createElement("div",null,c.a.createElement(m.a,{className:"justify-content-center"},c.a.createElement(d.a,{xl:4,lg:5},c.a.createElement("div",{className:"text-center"},c.a.createElement("div",null,c.a.createElement("img",{src:f.a,alt:"",className:"img-fluid"}))))),c.a.createElement(m.a,null,c.a.createElement(d.a,{className:"text-center"},c.a.createElement("h3",{className:"mt-3"},"Loading"),c.a.createElement("div",null,E.map((function(e,a){return c.a.createElement(p.a,{key:a,className:"m-2",size:"sm",type:"grow",color:e})})))))))))}}]),t}(r.Component);a.a=y},91:function(e,a,t){e.exports=t.p+"static/media/fetch-failed.d47b94a0.svg"},92:function(e,a,t){e.exports=t.p+"static/media/searching.fdf701a1.svg"}}]);
//# sourceMappingURL=20.98669438.chunk.js.map