import { scriptSrc } from "./globals";

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

let observer;
export function subscribeToResize() {
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
