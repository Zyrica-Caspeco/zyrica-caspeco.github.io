// javascript: (()=>{let e=document.createElement("script");e.src="http://localhost:1337/hmr.js",document.head.appendChild(e)})();
function log(...args) {
    console.log('[HMR]', ...args);
}

let ws;
const elements = {};

connect();

function connect() {
    log('connecting');
    ws = new WebSocket('ws://localhost:1337/hmr');
    ws.addEventListener('open', onOpen);
    ws.addEventListener('close', onClose);
    ws.addEventListener('message', onMessage);
}
function onOpen() {
    log('connected');
}

function onClose(){
    log('disconnected');
    setTimeout(connect, 100);
}
function onMessage({data}) {
    const file = data;
    log('reloading', file);
    if (elements[file]) {
        elements[file].remove();
    }
    const ele = document.createElement('script');
    ele.src = `http://localhost:1337/${file}`;
    document.head.appendChild(ele);
    elements[file] = ele;
}