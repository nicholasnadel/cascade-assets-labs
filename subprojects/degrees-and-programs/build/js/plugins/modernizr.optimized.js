/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-target-mq-setclasses-shiv-cssclassprefix:md- !*/
!function(e,t,n){function a(e,t){return typeof e===t}function r(){var e,t,n,r,o,i,s;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],t=c[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(r=a(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)i=e[o],s=i.split("."),1===s.length?Modernizr[s[0]]=r:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=r),d.push((r?"":"no-")+s.join("-"))}}function o(e){var t=f.className,n=Modernizr._config.classPrefix||"";if(m&&(t=t.baseVal),Modernizr._config.enableJSClass){var a=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(a,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),m?f.className.baseVal=t:f.className=t)}function i(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):m?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function s(){var e=t.body;return e||(e=i(m?"svg":"body"),e.fake=!0),e}function l(e,n,a,r){var o,l,c,u,d="modernizr",m=i("div"),h=s();if(parseInt(a,10))for(;a--;)c=i("div"),c.id=r?r[a]:d+(a+1),m.appendChild(c);return o=i("style"),o.type="text/css",o.id="s"+d,(h.fake?h:m).appendChild(o),h.appendChild(m),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),m.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",u=f.style.overflow,f.style.overflow="hidden",f.appendChild(h)),l=n(m,e),h.fake?(h.parentNode.removeChild(h),f.style.overflow=u,f.offsetHeight):m.parentNode.removeChild(m),!!l}var c=[],u={_version:"3.5.0",_config:{classPrefix:"md-",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){c.push({name:e,fn:t,options:n})},addAsyncTest:function(e){c.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=u,Modernizr=new Modernizr;var d=[],f=t.documentElement,m="svg"===f.nodeName.toLowerCase(),h=function(){var t=e.matchMedia||e.msMatchMedia;return t?function(e){var n=t(e);return n&&n.matches||!1}:function(t){var n=!1;return l("@media "+t+" { #modernizr { position: absolute; } }",function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position}),n}}();u.mq=h;m||!function(e,t){function n(e,t){var n=e.createElement("p"),a=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",a.insertBefore(n.lastChild,a.firstChild)}function a(){var e=E.elements;return"string"==typeof e?e.split(" "):e}function r(e,t){var n=E.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),E.elements=n+" "+e,c(t)}function o(e){var t=y[e[g]];return t||(t={},v++,e[g]=v,y[v]=t),t}function i(e,n,a){if(n||(n=t),d)return n.createElement(e);a||(a=o(n));var r;return r=a.cache[e]?a.cache[e].cloneNode():p.test(e)?(a.cache[e]=a.createElem(e)).cloneNode():a.createElem(e),!r.canHaveChildren||h.test(e)||r.tagUrn?r:a.frag.appendChild(r)}function s(e,n){if(e||(e=t),d)return e.createDocumentFragment();n=n||o(e);for(var r=n.frag.cloneNode(),i=0,s=a(),l=s.length;l>i;i++)r.createElement(s[i]);return r}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return E.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+a().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(E,t.frag)}function c(e){e||(e=t);var a=o(e);return!E.shivCSS||u||a.hasCSS||(a.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),d||l(e,a),e}var u,d,f="3.7.3",m=e.html5||{},h=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,p=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g="_html5shiv",v=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",u="hidden"in e,d=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){u=!0,d=!0}}();var E={elements:m.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:f,shivCSS:m.shivCSS!==!1,supportsUnknownElements:d,shivMethods:m.shivMethods!==!1,type:"default",shivDocument:c,createElement:i,createDocumentFragment:s,addElements:r};e.html5=E,c(t),"object"==typeof module&&module.exports&&(module.exports=E)}("undefined"!=typeof e?e:this,t),Modernizr.addTest("target",function(){var t=e.document;if(!("querySelectorAll"in t))return!1;try{return t.querySelectorAll(":target"),!0}catch(n){return!1}}),r(),o(d),delete u.addTest,delete u.addAsyncTest;for(var p=0;p<Modernizr._q.length;p++)Modernizr._q[p]();e.Modernizr=Modernizr}(window,document);