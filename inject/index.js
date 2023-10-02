import "./booking-events.js";
import {css, isIframe} from "./globals";
import {isDemo} from "./brödernas-demo";
import {
    getColor,
    printAllCaspecoElements,
} from "./on-clicks";
import { getIframe, sendToParent } from "./iframe";
import { ele as theme } from "./theme";

const themeDetected = getColor('--theme-colors-primary-wlv');
const hasIframe = getIframe();
if ((hasIframe || themeDetected) && !isIframe && !isDemo) {
    let ele = document.querySelector('zTools');
    if (ele) {
        ele.innerHTML = '';
    } else {
        ele = document.createElement('zTools');
        ele.style = css`
          position: fixed;
          top: 100px;
          left: 100px;
          max-height: 50%;
          overflow: auto;

          z-index: 99999999999;
          padding: 40px;
          color: white;
          background: rgba(0, 0, 0, 0.8);
        `;
        makeDraggable(ele);

        document.body.appendChild(ele);
    }

    ele.appendChild(createButton('Close', () => ele.remove()));
    ele.appendChild(createButton('Find Caspeco elements', printAllCaspecoElements));
    ele.appendChild(theme)
}

function createButton(name, onClick) {
    const button = document.createElement('button');
    button.style = css`all: revert;margin-right: 10px;margin-bottom: 10px`;
    button.innerHTML = name;
    button.onclick = onClick;
    return button;
}


function makeDraggable(ele) {
    function draggable(e) {
        if (e.target !== ele) return;
        e.preventDefault();

        let lastX = e.clientX || e.touches[0].clientX,
            lastY = e.clientY || e.touches[0].clientY;

        const move = e => {
            const x = e.clientX || e.touches[0].clientX,
                y = e.clientY || e.touches[0].clientY;

            let dx = x - lastX,
                dy = y - lastY;
            ele.style.left = (ele.offsetLeft + dx) + 'px';
            ele.style.top = (ele.offsetTop + dy) + 'px';
            lastX = x;
            lastY = y;
        };
        function unsubscribe() {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('touchmove', move);

            window.removeEventListener('mouseup', unsubscribe);
            window.removeEventListener('touchend', unsubscribe);
        }

        window.addEventListener('mousemove', move);
        window.addEventListener('touchmove', move);

        window.addEventListener('mouseup', unsubscribe);
        window.addEventListener('touchend', unsubscribe);
    }
    ele.addEventListener('mousedown', draggable);
    ele.addEventListener('touchstart', draggable);
}