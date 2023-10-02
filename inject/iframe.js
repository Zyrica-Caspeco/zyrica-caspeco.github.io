import { isIframe, scriptSrc } from "./globals";
import { isDemo, addCloseButton, close } from "./brödernas-demo";
import { setTheme } from "./on-clicks";

export function getIframe() {
    const allIframes = [...document.querySelectorAll('iframe')];
    return allIframes.find(iframe => iframe.src.includes('localhost') || iframe.src.includes('caspeco'));
}
export function sendToIframe(message) {
    const iframe = getIframe();
    if (!iframe) return;
    iframe.contentWindow.postMessage('load ' + scriptSrc, '*');
    iframe.contentWindow.postMessage(message, '*');
}

const createIframe = () => {
    function updateIframeWidth() {
        iframe.width = document.body.clientWidth + 'px';
    }

    let iframe = document.getElementById('localhostIframe');

    if (!iframe) {
        iframe = document.createElement('iframe');
        document.body.appendChild(iframe);

        addEventListener('resize', updateIframeWidth);
    }

    iframe.src = 'http://localhost:8080/?isWebBooking=true&system=se__testbb&unitId=14'
    iframe.id = 'localhostIframe';
    iframe.height = window.innerHeight * 0.75;
    window.iframe = iframe;

    updateIframeWidth();
}

if (isIframe) {
    subscribeToResize();
} else {
    // createIframe();
}
let observer;
function subscribeToResize() {
    if (observer) return;
    document.body.style = 'overflow: hidden;';
    const target = document.querySelector('#root').querySelector('div');
    observer = new ResizeObserver((entries) => {
        const height = Math.ceil(entries[0].target.getBoundingClientRect().height);
        window.parent.postMessage('height ' + height, '*');
    });
    observer.observe(target);
}
export function sendToParent(message) {
    window.parent.postMessage(message, '*');
}

window.addEventListener('message', e => {
    const msg = '' + e.data;
    if (msg === 'loaded') {
        sendToIframe('load ' + scriptSrc);
        if (isDemo) {
            setTheme('Brödernas');
            sendToIframe('addCloseButton');
        }
    } else if (msg.match(/^set/)) { // set color
        const [_, name, color] = msg.split(' ');
        setColor(name, color);
    } else if (msg.match(/^height/)) {
        const iframe = getIframe();
        iframe.height = msg.split(' ')[1] + 'px';
        iframe.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
    } else if (msg.match(/^load/)) {
        // load script
    } else if (msg === 'close') {
        close();
    } else if (msg === 'addCloseButton') {
        addCloseButton();
    } else if (e.data?.request) {
        // request
    } else {
        // console.log(name, 'got', e.data);
    }
});
if (window.parent) window.parent.postMessage('loaded', '*');
