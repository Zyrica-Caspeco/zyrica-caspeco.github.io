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

            const close = () => {
                document.getElementById('app-picker-modal').classList.remove('open');
                document.removeEventListener('click', close);
            };

            this.addEventListener('click', () => {
                document.getElementById('app-picker-modal').classList.toggle('open');
                setTimeout(() => {
                    document.addEventListener('click', close);
                });
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
            template.querySelector('a').setAttribute('href', this.getAttribute('url'));
            this.appendChild(template);
        }
    }
);

let first = true;
let count = 0;
const mount = () => {

    document.body.classList.remove('admin', 'personal', 'kassa', 'bokning', 'analys');

    const container = document.querySelector(".framework_menu_container") || document.querySelector('.menu-container');
    const systemSelect = document.getElementById('main.selectSystem.dropdownListView')  || document.querySelector('.menu-container');;
    if (!container || !systemSelect) {
        if (count++ < 300) setTimeout(mount, 100);
        return;
    }

    document.querySelector('app-picker-menu-item')?.remove();

    const item = document.createElement('div');
    container.insertBefore(item, container.firstChild);

    let color = "#0c0656";
    let abbreviation = "Ad";
    let name = "Admin";
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
    } else if (hash.includes('personal')) {
        color = '#4530C9';
        abbreviation = 'Pe';
        name = 'Personal';
    }

    item.outerHTML = `
    <app-picker-menu-item
        color="${color}"
        abbreviation="${abbreviation}"
        name="${name}"
    ></app-picker-menu-item>
    `;

    if (first && !isCheckout) {
        first = false;
        if (isCheckout) {

        } else {
            document.getElementById('menu.checkout.text').innerHTML = 'Artikelregister';
            document.body.classList.add(name.toLowerCase());

            const sideBar = document.querySelector('.framework_sidebar');
            sideBar.style['padding-bottom'] = '16px';
            const navbarFooter = document.createElement('div');
            sideBar.appendChild(navbarFooter);

            const help = document.getElementById('menu.support');
            const me = document.getElementById('menu.me');
            const logout = document.getElementById('menu.logout');

            navbarFooter.appendChild(help);
            navbarFooter.appendChild(me);
            navbarFooter.appendChild(logout);

            container.insertBefore(systemSelect, container.firstChild);
        }
    }
}

mount();
