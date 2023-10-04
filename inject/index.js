import "./booking-events.js";
import { css, isIframe } from "./globals";
import { isDemo } from "./brödernas-demo";
import {
    createButton,
    printAllCaspecoElements,
} from "./on-clicks";
import { getIframe } from "./iframe";
import { createThemePicker, getColor } from "./sections/theme";
import {createSection, sections} from "./sections/index";
import "./event-handler";

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

    ele.appendChild(createCloseButton());
    ele.appendChild(createButton('Find Caspeco elements', printAllCaspecoElements));
    ele.appendChild(sections);

    createSection('Theme', createThemePicker);
    // createSection('Css', createCssElement);
}

function createCloseButton() {
    const a = document.createElement('a');
    a.style = css`
      display: inline-block;
      position: absolute;
      top: 10px;
      left: 10px;
      width: 20px;
      height: 20px;
      transform: rotate(45deg);
    `;
    a.onclick = (e) => {
        e.preventDefault();
        a.parentElement.remove();
    };
    const horizontal = document.createElement('div');
    horizontal.style = css`
        width: 20px;
        border: 2px solid white;
        border-radius: 2px;
        position: absolute;
        top: 8px;
        left: 0;
    `;
    a.appendChild(horizontal);

    const vertical = document.createElement('div');
    vertical.style = css`
        height: 20px;
        border: 2px solid white;
        border-radius: 2px;
        position: absolute;
        top: 0;
        left: 8px;
    `;
    a.appendChild(vertical);

    return a;
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