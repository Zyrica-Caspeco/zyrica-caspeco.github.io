import {css, load, save} from "../globals";

export const sections = document.createElement('div');

export function createSection(name, createElement) {
    const key = 'zShow' + name;
    const section = document.createElement('div');
    sections.appendChild(section);
    let show = load(key);

    const render = () => {
        section.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.innerHTML = name;
        h1.style = css`
          all: revert;
          font-size: 20px;
          line-height: 1.5;
          margin: 0;
          padding: 0;
          font-family: sans-serif;
          cursor: pointer;
        `;
        h1.onclick = () => {
            show = !show;
            save(key, show);
            render();
        }
        section.appendChild(h1);

        const arrow = document.createElement('div');
        const arrowDown = css`
            display: inline-block;
            width: 0; 
            height: 0; 
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid white;
            margin: 5px;
        `;
        const arrowUp = css`
            display: inline-block;
            width: 0; 
            height: 0; 
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid white;
            margin: 5px;
        `;
        arrow.style = show ?  arrowUp : arrowDown;
        h1.prepend(arrow);

        const container = document.createElement('div');
        container.style.display = show ? 'block' : 'none';
        container.appendChild(createElement());
        section.appendChild(container);
    };
    render();

}
