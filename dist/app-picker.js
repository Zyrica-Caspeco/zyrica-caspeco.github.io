!function(){"use strict";const e=e=>e;let t=0;const n=()=>{document.querySelector(".framework_menu_container")||document.querySelector(".menu-container")?i():t++<100&&setTimeout(n,100)};let o={header:"Cloud",description:"Making dreams come true",abreviation:"CL",url:"https://admin-checkout.dev.caspeco.net"};const i=()=>{console.log("App Picker"),document.querySelector("#app-picker")?.remove();document.querySelector(".framework_menu_container")||(o={header:"Checkout",description:"True dreams in making",abreviation:"CO",url:"https://cloud.caspeco.se"});let t=document.querySelector(".framework_menu_container")||document.querySelector(".menu-container");if(t){const n=function(){const t=document.createElement("a");t.id="app-picker",t.style=e`
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        text-decoration: none;
        cursor: pointer;
    `,t.addEventListener("click",(()=>{document.location=o.url}));const n=document.createElement("div");n.style=e`
      width: 40px;
      height: 40px;
      background-color: blue;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
    `;const i=document.createElement("div");i.innerText=o.abreviation,i.style=e`
      color: white;
      font-weight: bold;
      font-size: 20px;
      text-align: center;
    `,n.appendChild(i),t.appendChild(n);const r=document.createElement("div");r.style=e`
        flex: 1;
    `;const c=document.createElement("div");c.innerText=o.header,c.style=e`
        font-weight: bold;
        font-size: 16px;
        line-height: 16px;
    `,r.appendChild(c);const d=document.createElement("div");return d.innerText=o.description,d.style=e`
        font-size: 12px;
        line-height: 12px;
    `,r.appendChild(d),t.appendChild(r),t}();t.insertBefore(n,t.firstChild)}};n()}();
