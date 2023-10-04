import {css} from "./globals";

export function printAllCaspecoElements() {
    const log = (ele) => console.log(ele);
    const classFilter = ele => {
        return ele.className.includes && ele.className.includes('caspeco');
    }
    const contentFilter = ele => ele.innerHTML.includes('caspeco');
    const contents  = [...document.querySelectorAll('script')].filter(contentFilter);
    const classes = [...document.querySelectorAll('*')].filter(classFilter);
    const elements = [...contents, ...classes];
    if (elements.length) {
        elements.forEach(log);
    } else {
        console.log('Could not find any Caspeco elements');
    }
}

export function createButton(name, onClick) {
    const button = document.createElement('button');
    button.style = css`all: revert;margin-right: 10px;margin-bottom: 10px`;
    button.innerHTML = name;
    button.onclick = onClick;
    return button;
}