!function(){"use strict";function e(...e){console.log("[HMR]",...e)}let n,t;function c(){e("connecting"),n=new WebSocket("ws://localhost:1337/hmr"),n.addEventListener("open",o),n.addEventListener("close",s),n.addEventListener("message",d)}function o(){e("connected")}function s(){e("disconnected"),setTimeout(c,100)}function d(){e("update"),t?.remove(),t=document.createElement("script"),t.src="http://localhost:1337/",document.head.appendChild(t)}c()}();
