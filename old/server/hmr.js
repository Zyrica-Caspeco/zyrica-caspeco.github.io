// javascript: (()=>{let e=document.createElement("script");e.src="http://localhost:1337/hmr.js",document.head.appendChild(e)})();

window.z = {};

function log(...args) {
    // console.log('[HMR]', ...args);
}

const eles = {};

connect();

function connect() {
    if (window.z.closeHmrWs) window.z.closeHmrWs();

    log('connecting');
    let ws = new WebSocket('ws://localhost:1337/hmr');
    ws.addEventListener('open', onOpen);
    ws.addEventListener('close', onClose);
    ws.addEventListener('message', onMessage);

    window.z.closeHmrWs = () => {
        ws.removeEventListener('close', onClose);
        ws.close();
    };
}

function onOpen() {
    log('connected');
}

function onClose() {
    log('disconnected');
    setTimeout(connect, 100);
}

function onMessage(e) {
    const name = e.data;
    loadFile(name);
}

function loadFile(name) {
    log('update', name);

    const isCss = name.endsWith('.css');
    const isScript = name.endsWith('.js');

    eles[name]?.remove();

    let ele;
    if (isCss) {
        ele = document.createElement('link');
        ele.rel = 'stylesheet';
        ele.href = `http://localhost:1337/css/` + name;
    } else if (isScript) {
        ele = document.createElement('script');
        ele.type = 'application/javascript';
        ele.src = `http://localhost:1337/` + name;
    } else {
        console.error('unknown file type', name);
    }
    if (ele) {
        document.head.appendChild(ele);
        eles[name] = ele;
    }
}

window.z.loadFile = loadFile;
