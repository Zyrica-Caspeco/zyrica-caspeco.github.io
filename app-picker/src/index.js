import html from './templates.html?raw';

const templates = document.createElement('div');
document.body.appendChild(templates);
templates.outerHTML = html;


import less from './style.less?inline';

const style = document.createElement('style');
style.innerHTML = less;
document.head.appendChild(style);

customElements.define(
    'app-picker-menu-item',
    class AppPickerMenuItem extends HTMLElement {
        constructor() {
            super();
            const template = document.getElementById('app-picker-menu-item').content.cloneNode(true);
            template.querySelector('.circle').style.backgroundColor = this.getAttribute('color');
            template.querySelector('.abbreviation').innerHTML = this.getAttribute('abbreviation');
            template.querySelector('.name').innerHTML = this.getAttribute('name');
            this.appendChild(template);

            this.addEventListener('click', () => {
                document.getElementById('app-picker-modal').classList.toggle('open');
            });
        }
    }
);
customElements.define(
    'app-picker-modal-item',
    class AppPickerModalItem extends HTMLElement {
        constructor() {
            super();
            const template = document.getElementById('app-picker-modal-item').content.cloneNode(true);
            template.querySelector('.circle').style.backgroundColor = this.getAttribute('color');
            template.querySelector('.abbreviation').innerHTML = this.getAttribute('abbreviation');
            template.querySelector('.name').innerHTML = this.getAttribute('name');
            template.querySelector('.description').innerHTML = this.getAttribute('description');
            this.appendChild(template);

            this.addEventListener('click', () => {
                document.getElementById('app-picker-modal').classList.toggle('open');
                window.location = this.getAttribute('url');
                mount();
            });
        }
    }
);

let count = 0;
const mount = () => {
    const container = document.querySelector(".framework_menu_container") || document.querySelector('.menu-container');
    if (!container) {
        if (count++ < 300) setTimeout(mount, 100);
        return;
    }

    document.querySelector('app-picker-menu-item')?.remove();

    const item = document.createElement('div');
    container.insertBefore(item, container.firstChild);

    let color = '#4530C9';
    let abbreviation = 'Pe';
    let name = 'Personal';
    const hash = window.location.hash.toLowerCase();
    const isCheckout = document.querySelector('.menu-container');
    if (isCheckout) {
        color = "#0269FF";
        abbreviation = "Ka";
        name = "Kassa";
    } else if (hash.includes('bokning')) {
        color = "#25AF72";
        abbreviation = "Bo";
        name = "Bokning";
    } else if (hash.includes('analys')) {
        color = "#EE657A";
        abbreviation = "An";
        name = "Analys";
    }

    item.outerHTML = `
    <app-picker-menu-item
        color="${color}"
        abbreviation="${abbreviation}"
        name="${name}"
    ></app-picker-menu-item>
    `;
}

mount();
