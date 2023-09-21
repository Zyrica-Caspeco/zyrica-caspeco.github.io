import themes from './themes.json';
let css = s => s;
const isIframe = window.self !== window.top;
const name = isIframe ? 'iframe' : 'parent';
const scriptSrc = document.currentScript.src;

if (window.ca) {
    window.ca.addEventListener('bookingEvent', (...args) => {
        console.log('Got booking event', ...args);
    })
}

function getIframe() {
    const allIframes = [...document.querySelectorAll('iframe')];
    return allIframes.find(iframe => iframe.src.includes('localhost') || iframe.src.includes('caspeco'));
}
function sendToIframe(message) {
    const iframe = getIframe();
    if (!iframe) return;
    iframe.contentWindow.postMessage('load ' + scriptSrc, '*');
    iframe.contentWindow.postMessage(message, '*');
}

const createIframe = () => {
    function updateIframeWidth() {
        iframe.width = document.body.clientWidth + 'px';
    }

    let iframe = document.getElementById('localhostIframe');

    if (!iframe) {
        iframe = document.createElement('iframe');
        document.body.appendChild(iframe);

        addEventListener('resize', updateIframeWidth);
    }

    iframe.src = 'http://localhost:8080/?isWebBooking=true&system=se__testbb&unitId=14'
    iframe.id = 'localhostIframe';
    iframe.height = window.innerHeight * 0.75;
    window.iframe = iframe;

    updateIframeWidth();
}

if (isIframe) {
    subscribeToResize();
} else {
    // createIframe();
}
let observer;
function subscribeToResize() {
    if (observer) return;
    document.body.style = 'overflow: hidden;';
    const target = document.querySelector('#root').querySelector('div');
    observer = new ResizeObserver((entries) => {
        const height = Math.ceil(entries[0].target.getBoundingClientRect().height);
        window.parent.postMessage('height ' + height, '*');
    });
    observer.observe(target);
}
function close() {
    const iframe = getIframe();
    if (!iframe) return;
    const container = iframe.parentElement;
    iframe.remove();
    container.style = '';
    [...container.children].forEach(child => child.style = '');
}
function sendToParent(message) {
    window.parent.postMessage(message, '*');
}
function addCloseButton() {
    const container = document.querySelector('header');
    if (!container.children[2]) {
        setTimeout(addCloseButton, 10);
        return;
    }
    container.children[2].remove();

    const div = document.createElement('div');
    div.style = css`
      color: white;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    `;

    const button = document.createElement('button');
    button.style = css`
      width: 40px;
      height: 40px;
    `;
    button.onclick = () => sendToParent('close');
    div.appendChild(button);

    const icon = document.createElement('div');
    icon.className = 'fa fa-close';
    icon.style = css`
      font-size: 20px;  
    `;
    button.appendChild(icon);

    container.appendChild(div);
}

window.addEventListener('message', e => {
    const msg = '' + e.data;
    if (msg === 'loaded') {
        sendToIframe('load ' + scriptSrc);
        if (isDemo) {
            setTheme('Brödernas');
            sendToIframe('addCloseButton');
        }
    } else if (msg.match(/^set/)) { // set color
        const [_, name, color] = msg.split(' ');
        setColor(name, color);
    } else if (msg.match(/^height/)) {
        const iframe = getIframe();
        iframe.height = msg.split(' ')[1] + 'px';
        iframe.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
    } else if (msg.match(/^load/)) {
        // load script
    } else if (msg === 'close') {
        close();
    } else if (msg === 'addCloseButton') {
        addCloseButton();
    } else if (e.data?.request) {
        // request
    } else {
        console.log(name, 'got', e.data);
    }
});
if (window.parent) window.parent.postMessage('loaded', '*');

function downloadTheme() {
    const theme = {};
    Object.keys(themes.Default).forEach(name => {
        theme[name] = getColor(name);
    });
    const a = document.createElement('a');
    const themeString = JSON.stringify(theme, null, "\t");
    const dataString = "data:text/json;charset=utf-8," + encodeURIComponent(themeString);
    a.setAttribute("href", dataString);
    a.setAttribute("download", "theme.json");
    a.click();
}


// Boknings demo brödernas
const isDemo = document.location.href.includes('www.brodernas.nu/restauranger');
if (isDemo) {
    const links = [...document.querySelectorAll('a')].filter(e => e.href.match(/^https:\/\/cloud\.caspeco\.se\/public\/webBooking/));
    links.forEach(link => {
        link.onclick = () => {
            close();
            const system = link.href.match(/system=([a-z]*_[a-z]*)/)[1];
            const unitId = link.href.match(/unitId=([0-9]*)/)[1];

            console.log({ system, unitId });


            let src = scriptSrc.includes('localhost') ? 'http://localhost:8080' : 'https://webbooking.dev.caspeco.net';

            const iframe = document.createElement('iframe');
            iframe.src = src + "/?isWebBooking=true&system=" + system + "&unitId=" + unitId;
            iframe.style = css`
              border: 1px solid #9e9e9e;
              padding: 1px;
              padding-right: 2px;
              flex: 1;
            `;

            const container = link.parentElement.parentElement;
            for (let i = 0; i < container.children.length; i++) {
                container.children[i].style.display = 'none';
            }
            container.style.border =  'none';
            container.style.padding = '0';
            container.style.display = 'flex';
            container.append(iframe);

            return false;
        };
    });
}


// Create widget
const themeDetected = getColor('--theme-colors-primary-wlv');
const hasIframe = getIframe();
if ((hasIframe || themeDetected) && !isIframe && !isDemo) {
    let css = s => s;
    let ele = document.querySelector('zTools');
    if (ele) {
        ele.innerHTML = '';
    } else {
        ele = document.createElement('zTools');
        ele.style = css`
          position: fixed;
          top: 100px;
          left: 100px;
          max-height: 50%;
          overflow: auto;

          z-index: 99999999999;
          padding: 40px;
          color: white;
          background: rgba(0, 0, 0, 0.8);
        `;
        makeDraggable(ele);

        document.body.appendChild(ele);
    }

    ele.appendChild(createButton('Close', () => ele.remove()));
    ele.appendChild(createButton('Find Caspeco elements', printAllCaspecoElements));
    ele.appendChild(createThemePicker());
    ele.appendChild(createSaveAndLoadTheme());
    getThemeVariableNames().map(colorSelection).forEach(color => {
        ele.appendChild(color);
    });
}

function createButton(name, onClick) {
    const button = document.createElement('button');
    button.style = css`all: revert;margin-right: 10px;margin-bottom: 10px`;
    button.innerHTML = name;
    button.onclick = onClick;
    return button;
}

function uploadTheme() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = () => {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const theme = JSON.parse(reader.result);
            Object.keys(theme).forEach(name => {
                setColor(name, theme[name]);
            });
        };
        reader.readAsText(file);
    };
    input.click();
}

function createSaveAndLoadTheme() {
    const container = document.createElement('div');

    const download = document.createElement('button');
    download.style = `all: revert; margin-right: 10px; margin-bottom: 10px;`;
    download.innerHTML = 'Save';
    download.onclick = downloadTheme;
    container.appendChild(download);

    const upload = document.createElement('button');
    upload.style = `all: revert; margin-bottom: 10px;`;
    upload.innerHTML = 'Load';
    upload.onclick = uploadTheme;
    container.appendChild(upload);

    return container;
}
function createThemePicker() {
    const ele = document.createElement('div');
    ele.style = 'margin-bottom: 10px;';
    const h1 = document.createElement('h1');
    h1.innerHTML = 'Theme';
    h1.style = css`
      all: revert;
      font-size: 20px;
      line-height: 1.5;
      margin: 0;
      padding: 0;
      font-family: sans-serif;
    `
    ele.appendChild(h1);
    Object.keys(themes).forEach(themeName => {
        const button = document.createElement('button');
        button.style = `all: revert;margin-right:10px;`;
        button.innerHTML = themeName;
        button.addEventListener('click', () => {
            setTheme(themeName);
        });
        ele.appendChild(button);
    });
    return ele;
}

function setTheme(themeName) {
    const theme = themes[themeName];
    Object.keys(theme).forEach((name) => {
        setColor(name, theme[name]);
    });
}

function getReadableName(name) {
    return name.replace('--theme-', '').replace('colors-', '').replace('-wlv', '').replaceAll('-', ' ');
}
function getThemeVariableNames() {
    return Object.keys(themes.Default);
}

function makeDraggable(ele) {
    function draggable(e) {
        if (e.target !== ele) return;
        e.preventDefault();

        let lastX = e.clientX || e.touches[0].clientX,
            lastY = e.clientY || e.touches[0].clientY;

        const move = e => {
            const x = e.clientX || e.touches[0].clientX,
                  y = e.clientY || e.touches[0].clientY;

            let dx = x - lastX,
                dy = y - lastY;
            ele.style.left = (ele.offsetLeft + dx) + 'px';
            ele.style.top = (ele.offsetTop + dy) + 'px';
            lastX = x;
            lastY = y;
        };
        function unsubscribe() {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('touchmove', move);

            window.removeEventListener('mouseup', unsubscribe);
            window.removeEventListener('touchend', unsubscribe);
        }

        window.addEventListener('mousemove', move);
        window.addEventListener('touchmove', move);

        window.addEventListener('mouseup', unsubscribe);
        window.addEventListener('touchend', unsubscribe);
    }
    ele.addEventListener('mousedown', draggable);
    ele.addEventListener('touchstart', draggable);
}
function printAllCaspecoElements() {
    const log = (ele) => console.log(ele);
    const classFilter = ele => {
        return ele.className.includes && ele.className.includes('caspeco');
    }
    const contentFilter = ele => ele.innerHTML.includes('caspeco');
    [...document.querySelectorAll('script')].filter(contentFilter).forEach(log);
    [...document.querySelectorAll('*')].filter(classFilter).forEach(log);
}

function getColor(name) {
    const root = document.querySelector(':root');
    let color = getComputedStyle(root).getPropertyValue(name);
    if (!color) {
        sendToIframe(`get ${name}`);
        color = themes.Default[name];
    }
    return color;
}
function setColor(name, color) {
    const root = document.querySelector(':root');
    root.style.setProperty(name, color);

    sendToIframe(`set ${name} ${color}`);
}

function colorSelection(name) {
    const ele = document.createElement('label');
    ele.style = `
              display: flex;
              align-items: center;
          `;


    const label = document.createElement('span');
    label.style = `margin-left: 10px;`;
    label.innerHTML = getReadableName(name);

    const input = document.createElement('input');
    input.type = 'color';
    input.value = getColor(name);
    input.addEventListener('input', () => {
        setColor(name, input.value);
    });

    ele.appendChild(input);
    ele.appendChild(label);

    return ele;
}