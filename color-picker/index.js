import themes from './themes.json';

if (window.ca) {
    window.ca.addEventListener('bookingEvent', (...args) => {
        console.log('Got booking event', ...args);
    })
}

const themeDetected = getColor('--theme-colors-primary-wlv');
if (themeDetected) {
    let css = s => s;
    let ele = document.querySelector('colorpicker');
    if (ele) {
        ele.innerHTML = '';
    } else {
        ele = document.createElement('colorpicker');
        ele.style = css`
              position: absolute;
              top: 100px;
              left: 100px;
              max-height: 50%;
              overflow: auto;
    
              z-index: 99999999999;
              padding: 20px;
              color: white;
              background: rgba(0, 0, 0, 0.8);
            `;
        makeDraggable(ele);
    }
    ele.appendChild(createThemePicker());
    getThemeVariableNames().map(colorSelection).forEach(color => {
        ele.appendChild(color);
    });
    document.body.appendChild(ele);
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
    createWidget();
}

function getReadableName(name) {
    return name.replace('--theme-', '').replace('colors-', '').replace('-wlv', '').replaceAll('-', ' ');
}
function getThemeVariableNames() {
    return Object.keys(themes.Default);
}

function makeDraggable(ele) {
    function draggable(e) {
        e.preventDefault();

        let x = e.clientX,
            y = e.clientY;

        const target = e.target;

        const move = e => {
            let dx = e.clientX - x,
                dy = e.clientY - y;
            target.style.left = (target.offsetLeft + dx) + 'px';
            target.style.top = (target.offsetTop + dy) + 'px';
            x = e.clientX;
            y = e.clientY;
        };
        window.addEventListener('mousemove', move);

        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', move);
        });
    }
    ele.addEventListener('mousedown', draggable);
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
