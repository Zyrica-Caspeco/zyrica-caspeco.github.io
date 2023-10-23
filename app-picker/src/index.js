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

      }
  }
);

if (!document.querySelector(".framework_menu_container"))

const item =document.createElement('div');
const container = document.querySelector(".framework_menu_container");
container.insertBefore(item, container.firstChild);

item.outerHTML = `
<app-picker-menu-item color="blue" abbreviation="Zy" name="Zyrica"/>
`
