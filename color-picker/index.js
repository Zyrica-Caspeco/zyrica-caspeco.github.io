import themes from './themes.json';

if (window.ca) {
    window.ca.addEventListener('bookingEvent', (...args) => {
        console.log('Got booking event', ...args);
    })
}


// Boknings demo brödernas
if (document.location.href.includes('www.brodernas.nu/restauranger')) {
    const links = [...document.querySelectorAll('a')].filter(e => e.href.match(/^https:\/\/cloud\.caspeco\.se\/public\/webBooking/));
    links.forEach(link => {
        link.onclick = () => {
            const system = link.href.match(/system=([a-z]*_[a-z]*)/)[1];
            const unitId = link.href.match(/unitId=([0-9]*)/)[1];

            console.log({ system, unitId });

            const iframe = document.createElement('iframe');
            iframe.src = "https://webbooking.dev.caspeco.net/?isWebBooking=true&system=" + system + "&unitId=" + unitId;
            iframe.style = css`
              margin-left: -25px;
                border: none;
            ` + 'height: ' + (window.innerHeight- 60) + 'px;'
            + 'width: ' + window.innerWidth + 'px;';

            const container = link.parentElement.parentElement;
            container.style = css`
                display: flex;
                flex-direction: column;
                width: 100%;
                border-left:none;
                border-right:none;
                margin-left: 0;
                margin-right: 0;
                padding-left: 0;
                padding-right: 0;
            ` + 'height: ' + window.innerHeight + 'px';
            [...container.children].forEach(child => {
                child.remove();
            });
            container.appendChild(iframe);

            return false;
        };
    });
}

const themeDetected = getColor('--theme-colors-primary-wlv');
if (themeDetected) {
    let css = s => s;
    let ele = document.querySelector('zTools');
    if (ele) {
        ele.innerHTML = '';
    } else {
        ele = document.createElement('zTools');
        ele.style = css`
          position: absolute;
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
    
    ele.appendChild(createThemePicker());
    getThemeVariableNames().map(colorSelection).forEach(color => {
        ele.appendChild(color);
    });
}

function createThemePicker() {
    const ele = document.createElement('div');
    ele.style = 'margin-bottom: 10px;';
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


function getColor(name) {
    const root = document.querySelector(':root');
    return getComputedStyle(root).getPropertyValue(name);
}
function setColor(name, color) {
    const root = document.querySelector(':root');
    root.style.setProperty(name, color);
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
