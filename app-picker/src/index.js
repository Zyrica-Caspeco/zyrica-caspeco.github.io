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
            const modal = template.querySelector('.app-picker-modal');
            template.querySelector('.circle').style.backgroundColor = this.getAttribute('color');
            template.querySelector('.abbreviation').innerHTML = this.getAttribute('abbreviation');
            template.querySelector('.name').innerHTML = this.getAttribute('name');
            this.appendChild(template);

            document.body.appendChild(modal);

            const cloud = this.getAttribute('cloud') || 'https://cloud.caspeco.se';
            modal.querySelector('[name="Admin"]').setAttribute('url', cloud + '/home');
            modal.querySelector('[name="Personal"]').setAttribute('url', cloud + '/payroll/staff/timereport/main#Personal');
            modal.querySelector('[name="Bokning"]').setAttribute('url', cloud + '/booking/timetable#Bokning');
            modal.querySelector('[name="Analys"]').setAttribute('url', cloud + '/air/landingPage#Analys');

            const backoffice = this.getAttribute('backoffice') || 'https://admin-checkout.dev.caspeco.net';
            modal.querySelector('[name="Kassa"]').setAttribute('url', backoffice);

            const close = () => {
                modal.classList.remove('open');
                document.removeEventListener('click', close);
            };

            this.addEventListener('click', () => {
                modal.classList.toggle('open');
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
        static observedAttributes = ['url'];

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

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'url') {
                this.querySelector('a').setAttribute('href', newValue);
            }
        }
    }
);

let first = true;
let count = 0;
const mount = () => {
    document.body.classList.remove('admin', 'personal', 'kassa', 'bokning', 'analys');

    const container = document.querySelector(".framework_menu_container") || document.querySelector('.menu-container');
    const systemSelect = document.getElementById('main.selectSystem.dropdownListView') || document.querySelector('.menu-container');
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

if (document.location.includes('cloud'))
    mount();

window.mountAppPicker = mount;
