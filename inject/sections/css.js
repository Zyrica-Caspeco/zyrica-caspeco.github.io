import { files } from '../../dist/css.json';
import {isLocalhost} from "../globals";
import {createButton} from "../on-clicks";

console.log(files);

const pathToFolder = isLocalhost ? 'css/' : 'dist/dist'
export function createCssElement() {
    const ele = document.createElement('div');
    files.forEach(filename => ele.appendChild(createButton(filename, () => console.log(filename))));
    return ele;
}
