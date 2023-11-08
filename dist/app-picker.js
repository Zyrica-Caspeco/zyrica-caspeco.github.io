const k=`<template id="app-picker-menu-item">\r
    <div class="circle"><span class="abbreviation">{{abbreviation}}</span></div>\r
    <span class="name">{{name}}</span>\r
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\r
        <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->\r
        <path d="M88 72v48H40V72H88zM40 32C17.9 32 0 49.9 0 72v48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40V72c0-22.1-17.9-40-40-40H40zM88 232v48H40V232H88zM40 192c-22.1 0-40 17.9-40 40v48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40V232c0-22.1-17.9-40-40-40H40zm0 200H88v48H40V392zM0 392v48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40V392c0-22.1-17.9-40-40-40H40c-22.1 0-40 17.9-40 40zM248 72v48H200V72h48zM200 32c-22.1 0-40 17.9-40 40v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V72c0-22.1-17.9-40-40-40H200zm0 200h48v48H200V232zm-40 0v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V232c0-22.1-17.9-40-40-40H200c-22.1 0-40 17.9-40 40zm88 160v48H200V392h48zm-48-40c-22.1 0-40 17.9-40 40v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V392c0-22.1-17.9-40-40-40H200zM360 72h48v48H360V72zm-40 0v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V72c0-22.1-17.9-40-40-40H360c-22.1 0-40 17.9-40 40zm88 160v48H360V232h48zm-48-40c-22.1 0-40 17.9-40 40v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V232c0-22.1-17.9-40-40-40H360zm0 200h48v48H360V392zm-40 0v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V392c0-22.1-17.9-40-40-40H360c-22.1 0-40 17.9-40 40z"/>\r
    </svg>\r
</template>\r
\r
<template id="app-picker-modal-item">\r
    <a href="">\r
        <div class="circle"><span class="abbreviation">{{abbreviation}}</span></div>\r
        <div class="content">\r
            <span class="name">{{name}}</span>\r
            <span class="description">{{description}}</span>\r
        </div>\r
    </a>\r
</template>\r
\r
<div id="app-picker-modal">\r
    <app-picker-modal-item\r
            url="https://cloud.caspeco.se/home"\r
            color="#0c0656"\r
            abbreviation="Ad"\r
            name="Admin"\r
            description="Hantera centrala register och få en översikt av ditt varumärke">\r
    </app-picker-modal-item>\r
    <div class="divider"></div>\r
    <app-picker-modal-item\r
            url="https://cloud.caspeco.se/payroll/staff/timereport/main#Personal"\r
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
            url="https://cloud.caspeco.se/booking/timetable#Bokning"\r
            color="#25AF72"\r
            abbreviation="Bo"\r
            name="Bokning"\r
            description="Hantera bokningar av bord, bowling etc.">\r
    </app-picker-modal-item>\r
    <app-picker-modal-item\r
            url="https://cloud.caspeco.se/air/landingPage#Analys"\r
            color="#EE657A"\r
            abbreviation="An"\r
            name="Analys"\r
            description="Få hjälp med planering och uppföljning">\r
    </app-picker-modal-item>\r
</div>\r
`,f=`html,body{width:100%;height:100%;text-shadow:none;font-family:Inter,sans-serif;font-size:16px;font-weight:400;line-height:1.5;letter-spacing:normal;color:#0c0656;text-transform:none}body{background:#FAFAFA}body .framework_menu_item_header,body .framework_menu_item_header_text,body .framework_menu_item,body .framework_menu_subitem,body .modal_topBar,body .modal_mainArea .groupBox .groupBox_legend{font-family:inherit;font-weight:inherit;font-size:inherit;line-height:inherit;text-shadow:none;letter-spacing:inherit;color:inherit;text-transform:inherit}body .application,body .framework_mainArea,body .createScheduleView__wrapperEmptyState,body .groupBox,body .tableView__contentWrapper,body .tableView__row,body .tableView__headerCell{background:none}body header.framework_topBar{display:none}body .menu-button-container{display:none}body .framework_menu_item-active,body .framework_menu_item-active-payroll{background-color:transparent}body .framework_menu_item_header{padding:.5rem 1rem;gap:.5rem}body .framework_menu_item_header:hover{background-color:#0c06560f;text-decoration:underline}body .framework_menu_item_header.framework_menu_item_header-active{font-weight:700}body .framework_menu_item_header .icon{height:1.5rem;width:1.5rem;margin:0;color:#0c0656}body.admin #menu\\.payroll,body.admin #menu\\.time,body.admin #menu\\.schedule,body.admin #menu\\.communication,body.admin #menu\\.booking,body.admin #menu\\.survey,body.admin #menu\\.invoice,body.admin #menu\\.reports,body.admin #menu\\.air{display:none}body.admin .framework_sidebar{background:#ecebf0}body.personal #menu\\.home,body.personal #menu\\.booking,body.personal #menu\\.survey,body.personal #menu\\.invoice,body.personal #menu\\.reports,body.personal #menu\\.air,body.personal #menu\\.settings,body.personal #menu\\.checkout,body.personal #menu\\.management,body.personal #menu\\.casperui{display:none}body.personal .framework_sidebar{background:#eceafa}body.bokning #menu\\.home,body.bokning #menu\\.payroll,body.bokning #menu\\.time,body.bokning #menu\\.schedule,body.bokning #menu\\.communication,body.bokning #menu\\.survey,body.bokning #menu\\.invoice,body.bokning #menu\\.reports,body.bokning #menu\\.air,body.bokning #menu\\.settings,body.bokning #menu\\.management,body.bokning #menu\\.casperui{display:none}body.bokning .framework_sidebar{background:#e5f5ee}body.analys #menu\\.home,body.analys #menu\\.booking,body.analys #menu\\.payroll,body.analys #menu\\.time,body.analys #menu\\.schedule,body.analys #menu\\.communication,body.analys #menu\\.invoice,body.analys #menu\\.settings,body.analys #menu\\.checkout,body.analys #menu\\.management,body.analys #menu\\.casperui{display:none}body.analys .framework_sidebar{background:#fdf0f2}body.desktop .framework_sidebar{flex-direction:column;justify-content:space-between;width:260px;min-width:260px}body.desktop .framework_sidebar .input_group{width:auto;max-width:none;height:auto;max-height:none}body.desktop .framework_sidebar .input_group .input{display:block;border-radius:0;color:#0c0656;background-color:transparent;line-height:inherit;padding:0}body.desktop .framework_sidebar .input_group .input[disabled]{color:#0c06567a}body.desktop .framework_sidebar .input_group .input[placeholder]{color:#0c0656}body.desktop .framework_sidebar .input_group .innerInputContainer{background:transparent;border:none;border-radius:0;border-bottom:1px solid #bab8cf;width:auto;max-width:none;margin:16px;padding:0 0 16px}body.desktop .framework_sidebar .input_group .innerInputContainer .input_append{display:none}body.desktop .framework_sidebar .input_group .innerInputContainer.innerInputContainer-disabled{background-color:#0c06560f;color:#0c06567a;border-color:transparent}body.desktop .framework_sidebar .input_group .input_append{border:0;width:1.5rem;height:1.5rem;min-width:auto}body.desktop .framework_sidebar .input_group .input_append .button{background-color:transparent;border-radius:0;padding:0;width:1.5rem;height:1.5rem}body.desktop .framework_sidebar .input_group .input_prepend{border:0;gap:0;width:1.5rem;height:1.5rem}body.desktop .framework_sidebar .input_group .input_prepend .icon{width:1.5rem;height:1.5rem}body.desktop .framework_sidebar .innerInputContainer{display:flex;height:40px;padding:0 1rem;align-items:center;border:1px solid rgba(12,6,86,.24);background-color:#fff;border-radius:.25rem;gap:.5rem}body .framework_menu_item_header_space{display:none}body .framework_menu_item_subitems{padding-bottom:0}body .framework_menu_item_subitems .activeIndicator{display:none}body.desktop .framework_menu_subitem{padding:0 0 0 1.75rem!important;color:inherit}body.desktop .framework_menu_subitem:hover{background-color:#0c06560f;text-decoration:underline}body.desktop .framework_menu_subitem.active{background-color:transparent;font-weight:700;color:inherit}body.desktop .framework_menu_subitem.active:hover{text-decoration:none;background-color:transparent}body.desktop .framework_menu_subitem .menuLabel{display:block;padding:.5rem 0 .5rem 1.25rem;border-left:1px solid rgba(12,6,86,.48)}body .columnToggle__big{display:none}app-picker-menu-item{position:static;font-family:Inter,Roboto,sans-serif;font-weight:400;font-size:16px;line-height:24px;padding:16px;display:flex;justify-content:center;align-items:center;gap:8px}app-picker-menu-item:hover{cursor:pointer;background:#0269FF1F}app-picker-menu-item .circle{height:24px;width:24px;border-radius:50%;display:flex;justify-content:center;align-items:center;color:#fff;font-weight:700;font-size:10px}app-picker-menu-item .name{flex:1;color:#0c0656}app-picker-menu-item svg{width:14px;height:14px;fill:#0c0656}app-picker-modal-item{font-family:Inter,Roboto,sans-serif;font-weight:400;font-size:16px;line-height:24px}app-picker-modal-item>a{padding:16px;display:flex;justify-content:center;align-items:center;gap:12px}app-picker-modal-item>a:hover{cursor:pointer;background:#0269FF1F;text-decoration:none}app-picker-modal-item .circle{height:56px;width:56px;border-radius:50%;display:flex;justify-content:center;align-items:center;color:#fff;font-weight:700;font-size:26px}app-picker-modal-item .content{display:flex;flex-direction:column;flex:1}app-picker-modal-item .content .name{font-size:20px;line-height:20px;font-weight:700;color:#0c0656}app-picker-modal-item .content .description{font-size:14px;line-height:18px;color:#0c06567a}#app-picker-modal{display:none;position:absolute;box-shadow:0 8px 40px 7px #0000003d;width:320px;border-radius:16px;gap:8px;padding:16px 0;top:16px;left:16px;background:white;z-index:1}#app-picker-modal .divider{height:1px;background:#c5c3d7;margin:16px}#app-picker-modal.open{display:block}
`,l=document.createElement("div");document.body.appendChild(l);l.outerHTML=k;const u=document.createElement("style");u.innerHTML=f;document.head.appendChild(u);customElements.define("app-picker-menu-item",class extends HTMLElement{constructor(){super();const e=document.getElementById("app-picker-menu-item").content.cloneNode(!0);e.querySelector(".circle").style.backgroundColor=this.getAttribute("color"),e.querySelector(".abbreviation").innerHTML=this.getAttribute("abbreviation"),e.querySelector(".name").innerHTML=this.getAttribute("name"),this.appendChild(e);const t=()=>{document.getElementById("app-picker-modal").classList.remove("open"),document.removeEventListener("click",t)};this.addEventListener("click",()=>{document.getElementById("app-picker-modal").classList.toggle("open"),setTimeout(()=>{document.addEventListener("click",t)})})}});customElements.define("app-picker-modal-item",class extends HTMLElement{constructor(){super();const e=document.getElementById("app-picker-modal-item").content.cloneNode(!0);e.querySelector(".circle").style.backgroundColor=this.getAttribute("color"),e.querySelector(".abbreviation").innerHTML=this.getAttribute("abbreviation"),e.querySelector(".name").innerHTML=this.getAttribute("name"),e.querySelector(".description").innerHTML=this.getAttribute("description"),e.querySelector("a").setAttribute("href",this.getAttribute("url")),this.appendChild(e)}});let s=!0,_=0;const b=()=>{var c;document.body.classList.remove("admin","personal","kassa","bokning","analys");const n=document.querySelector(".framework_menu_container")||document.querySelector(".menu-container"),e=document.getElementById("main.selectSystem.dropdownListView")||document.querySelector(".menu-container");if(!n||!e){_++<300&&setTimeout(b,100);return}(c=document.querySelector("app-picker-menu-item"))==null||c.remove();const t=document.createElement("div");n.insertBefore(t,n.firstChild);let r="#0c0656",i="Ad",o="Admin";const d=window.location.hash.toLowerCase(),m=document.querySelector(".menu-container");if(m?(r="#0269FF",i="Ka",o="Kassa"):d.includes("bokning")?(r="#25AF72",i="Bo",o="Bokning"):d.includes("analys")?(r="#EE657A",i="An",o="Analys"):d.includes("personal")&&(r="#4530C9",i="Pe",o="Personal"),t.outerHTML=`
    <app-picker-menu-item
        color="${r}"
        abbreviation="${i}"
        name="${o}"
    ></app-picker-menu-item>
    `,s&&!m&&(s=!1,!m)){document.getElementById("menu.checkout.text").innerHTML="Artikelregister",document.body.classList.add(o.toLowerCase());const p=document.querySelector(".framework_sidebar");p.style["padding-bottom"]="16px";const a=document.createElement("div");p.appendChild(a);const y=document.getElementById("menu.support"),h=document.getElementById("menu.me"),g=document.getElementById("menu.logout");a.appendChild(y),a.appendChild(h),a.appendChild(g),n.insertBefore(e,n.firstChild)}};b();
