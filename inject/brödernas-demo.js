import { scriptSrc, css } from "./globals";
import {getIframe, sendToParent} from "./iframe";

export const isDemo = document.location.href.includes('www.brodernas.nu/restauranger');

export function close() {
    const iframe = getIframe();
    if (!iframe) return;
    const container = iframe.parentElement;
    iframe.remove();
    container.style = '';
    [...container.children].forEach(child => child.style = '');
}
export function addCloseButton() {
    const container = document.querySelector('header');
    if (!container.children[2]) {
        setTimeout(addCloseButton, 10);
        return;
    }
    container.children[2].remove();

    const div = document.createElement('div');
    div.style = css`
      color: white;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    `;

    const button = document.createElement('button');
    button.style = css`
      width: 40px;
      height: 40px;
    `;
    button.onclick = () => sendToParent('close');
    div.appendChild(button);

    const icon = document.createElement('div');
    icon.className = 'fa fa-close';
    icon.style = css`
      font-size: 20px;  
    `;
    button.appendChild(icon);

    container.appendChild(div);
}
(() =>{
    if (!isDemo) return;

    const links = [...document.querySelectorAll('a')].filter(e => e.href.match(/^https:\/\/cloud\.caspeco\.se\/public\/webBooking/));
    links.forEach(link => {
        link.onclick = () => {
            close();
            const system = link.href.match(/system=([a-z]*_[a-z]*)/)[1];
            const unitId = link.href.match(/unitId=([0-9]*)/)[1];

            console.log({ system, unitId });


            let src = scriptSrc.includes('localhost') ? 'http://localhost:8080' : 'https://webbooking.dev.caspeco.net';

            const iframe = document.createElement('iframe');
            iframe.src = src + "/?isWebBooking=true&system=" + system + "&unitId=" + unitId;
            iframe.style = css`
              border: 1px solid #9e9e9e;
              padding: 1px;
              padding-right: 2px;
              flex: 1;
            `;

            const container = link.parentElement.parentElement;
            for (let i = 0; i < container.children.length; i++) {
                container.children[i].style.display = 'none';
            }
            container.style.border =  'none';
            container.style.padding = '0';
            container.style.display = 'flex';
            container.append(iframe);

            return false;
        };
    });
})()