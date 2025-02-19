import { files } from '../../dist/css.json';
import {isLocalhost} from "../globals";
import {createButton} from "../on-clicks";

const eles = {};
export function createCssElement() {
    const ele = document.createElement('div');
    files.forEach(filename => {
        const onClick = () => {
            if (isLocalhost) {
                window.z.loadFile(filename);
            } else {
                eles[filename]?.remove();

                const style = document.createElement('link');
                style.rel = 'stylesheet';
                style.href = `https://zyrica-caspeco.github.io/dist/css/${filename}`;
                document.head.appendChild(style);
                eles[filename] = style;
            }
        };
        const button = createButton(filename, onClick);
        ele.appendChild(button);
    });
    return ele;
}
