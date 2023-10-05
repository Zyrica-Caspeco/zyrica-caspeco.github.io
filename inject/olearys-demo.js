import {css, isLocalhost} from "./globals";

export const isDemo = document.location.href.includes('olearys.se');

(() => {
    if (!isDemo) return;

    const ele = document.querySelector('button.track-book-button');
    ele.onclick = (e) => {
        e.preventDefault();
        e.cancelBubble = true;

        const container = ele.parentElement.parentElement.parentElement;
        [...container.children].forEach(child => child.style.display = 'none');


        let src = isLocalhost ? 'http://localhost:8080' : 'https://booking.dev.caspeco.net';

        const {system, unitid} = document.getElementById("caspeco-book").dataset;
        const iframe = document.createElement('iframe');
        iframe.src = src + "/?system=" + system + "&unitId=" + unitid;
        iframe.style = css`
          border: 1px solid #9e9e9e;
          padding: 1px;
          padding-right: 2px;
          flex: 1;
        `;
        container.style.display = 'flex';
        container.appendChild(iframe);

        document.querySelector('.hero.hero--medium-fullheight').style.height = 'auto';
        document.querySelector('.hero__nav.hero-nav').style.position = 'relative';
    }
})();
