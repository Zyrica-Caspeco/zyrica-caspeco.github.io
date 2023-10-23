const l=`<template id="app-picker-menu-item">\r
    <div class="circle"><span class="abbreviation">{{abbreviation}}</span></div>\r
    <span class="name">{{name}}</span>\r
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\r
        <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->\r
        <path d="M88 72v48H40V72H88zM40 32C17.9 32 0 49.9 0 72v48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40V72c0-22.1-17.9-40-40-40H40zM88 232v48H40V232H88zM40 192c-22.1 0-40 17.9-40 40v48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40V232c0-22.1-17.9-40-40-40H40zm0 200H88v48H40V392zM0 392v48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40V392c0-22.1-17.9-40-40-40H40c-22.1 0-40 17.9-40 40zM248 72v48H200V72h48zM200 32c-22.1 0-40 17.9-40 40v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V72c0-22.1-17.9-40-40-40H200zm0 200h48v48H200V232zm-40 0v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V232c0-22.1-17.9-40-40-40H200c-22.1 0-40 17.9-40 40zm88 160v48H200V392h48zm-48-40c-22.1 0-40 17.9-40 40v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V392c0-22.1-17.9-40-40-40H200zM360 72h48v48H360V72zm-40 0v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V72c0-22.1-17.9-40-40-40H360c-22.1 0-40 17.9-40 40zm88 160v48H360V232h48zm-48-40c-22.1 0-40 17.9-40 40v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V232c0-22.1-17.9-40-40-40H360zm0 200h48v48H360V392zm-40 0v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V392c0-22.1-17.9-40-40-40H360c-22.1 0-40 17.9-40 40z"/>\r
    </svg>\r
</template>\r
\r
<template id="app-picker-modal-item">\r
    <div class="circle"><span class="abbreviation">{{abbreviation}}</span></div>\r
    <div class="content">\r
        <span class="name">{{name}}</span>\r
        <span class="description">{{description}}</span>\r
    </div>\r
</template>\r
\r
<div id="app-picker-modal">\r
    <app-picker-modal-item\r
            url="https://cloud.caspeco.se/home#Personal"\r
            color="#4530C9"\r
            abbreviation="Pe"\r
            name="Personal"\r
            description="Hantera schema, arbetstid, dagsavstämning och lön">\r
    </app-picker-modal-item>\r
    <app-picker-modal-item\r
            url="https://admin-checkout.dev.caspeco.net"\r
            color="#0269FF"\r
            abbreviation="Ka"\r
            name="Kassa"\r
            description="Hantera meny för dina kassor och gäster">\r
    </app-picker-modal-item>\r
    <app-picker-modal-item\r
            url="https://cloud.caspeco.se/home#Bokning"\r
            color="#25AF72"\r
            abbreviation="Bo"\r
            name="Bokning"\r
            description="Hantera bokningar av bord, bowling etc.">\r
    </app-picker-modal-item>\r
    <app-picker-modal-item\r
            url="https://cloud.caspeco.se/home#Analys"\r
            color="#EE657A"\r
            abbreviation="An"\r
            name="Analys"\r
            description="Få hjälp med planering och uppföljning">\r
    </app-picker-modal-item>\r
</div>\r
`,m=`app-picker-menu-item{position:static;display:flex;font-family:Inter,Roboto,sans-serif;font-weight:400;font-size:16px;line-height:24px;padding:10px;justify-content:center;align-items:center;gap:8px}app-picker-menu-item:hover{cursor:pointer;background:#0269FF1F}app-picker-menu-item .circle{height:24px;width:24px;border-radius:50%;display:flex;justify-content:center;align-items:center;color:#fff;font-weight:700;font-size:10px}app-picker-menu-item .name{flex:1;color:#0c0656}app-picker-menu-item svg{width:14px;height:14px;fill:#0c0656}app-picker-modal-item{display:flex;font-family:Inter,Roboto,sans-serif;font-weight:400;font-size:16px;line-height:24px;padding:16px;justify-content:center;align-items:center;gap:12px}app-picker-modal-item:hover{cursor:pointer;background:#0269FF1F}app-picker-modal-item:hover .content{text-decoration:underline}app-picker-modal-item .circle{height:56px;width:56px;border-radius:50%;display:flex;justify-content:center;align-items:center;color:#fff;font-weight:700;font-size:26px}app-picker-modal-item .content{display:flex;flex-direction:column;flex:1}app-picker-modal-item .content .name{font-size:20px;line-height:20px;font-weight:700;color:#0c0656}app-picker-modal-item .content .description{font-size:14px;line-height:18px;color:#0c06567a}#app-picker-modal{display:none;position:absolute;box-shadow:0 8px 40px 7px #0000003d;width:320px;border-radius:16px;gap:8px;padding:16px 0;top:16px;left:16px;background:white;z-index:1}#app-picker-modal.open{display:block}
`,p=document.createElement("div");document.body.appendChild(p);p.outerHTML=l;const s=document.createElement("style");s.innerHTML=m;document.head.appendChild(s);customElements.define("app-picker-menu-item",class extends HTMLElement{constructor(){super();const e=document.getElementById("app-picker-menu-item").content.cloneNode(!0);e.querySelector(".circle").style.backgroundColor=this.getAttribute("color"),e.querySelector(".abbreviation").innerHTML=this.getAttribute("abbreviation"),e.querySelector(".name").innerHTML=this.getAttribute("name"),this.appendChild(e),this.addEventListener("click",()=>{document.getElementById("app-picker-modal").classList.toggle("open")})}});customElements.define("app-picker-modal-item",class extends HTMLElement{constructor(){super();const e=document.getElementById("app-picker-modal-item").content.cloneNode(!0);e.querySelector(".circle").style.backgroundColor=this.getAttribute("color"),e.querySelector(".abbreviation").innerHTML=this.getAttribute("abbreviation"),e.querySelector(".name").innerHTML=this.getAttribute("name"),e.querySelector(".description").innerHTML=this.getAttribute("description"),this.appendChild(e),this.addEventListener("click",()=>{document.getElementById("app-picker-modal").classList.toggle("open"),window.location=this.getAttribute("url"),r()})}});let d=0;const r=()=>{var a;const t=document.querySelector(".framework_menu_container")||document.querySelector(".menu-container");if(!t){d++<300&&setTimeout(r,100);return}(a=document.querySelector("app-picker-menu-item"))==null||a.remove();const e=document.createElement("div");t.insertBefore(e,t.firstChild);let n="#4530C9",i="Pe",o="Personal";const c=window.location.hash.toLowerCase();document.querySelector(".menu-container")?(n="#0269FF",i="Ka",o="Kassa"):c.includes("bokning")?(n="#25AF72",i="Bo",o="Bokning"):c.includes("analys")&&(n="#EE657A",i="An",o="Analys"),e.outerHTML=`
    <app-picker-menu-item
        color="${n}"
        abbreviation="${i}"
        name="${o}"
    ></app-picker-menu-item>
    `};r();
