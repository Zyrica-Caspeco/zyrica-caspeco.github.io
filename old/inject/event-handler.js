import {isIframe, scriptSrc} from "./globals";
import {addCloseButton, close, isDemo as isDemoBrodernas} from "./brödernas-demo";
import {setColor, setTheme} from "./sections/theme";
import {getIframe, sendToIframe, subscribeToResize} from "./iframe";
import {isDemo as isDemoOlearys} from "./olearys-demo";

if (isIframe) {
    subscribeToResize();
} else {
    // createIframe();
}
window.addEventListener('message', e => {
    const msg = '' + e.data;
    if (msg === 'loaded') {
        sendToIframe('load ' + scriptSrc);
        if (isDemoBrodernas) {
            setTheme('Brödernas');
            sendToIframe('addCloseButton');
        }
        if (isDemoOlearys) {
            setTheme('O´Learys');
        }
    } else if (msg.match(/^set/)) { // set color
        const [_, name, color] = msg.split(' ');
        setColor(name, color);
    } else if (msg.match(/^height/)) {
        const iframe = getIframe();
        iframe.height = msg.split(' ')[1] + 'px';
        if (isDemoBrodernas) {
            iframe.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
        }
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
