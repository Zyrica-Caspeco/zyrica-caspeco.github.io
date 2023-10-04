import themes from "../themes.json";
import { sendToIframe } from "../iframe";

function UpdateThemePicker() {
    container.innerHTML = '';

    container.appendChild(createThemePickerInner());
    container.appendChild(createSaveAndLoadTheme());

    getThemeVariableNames().map(colorSelection).forEach(color => {
        container.appendChild(color);
    });
}

const container = document.createElement('div');
export function createThemePicker() {
    UpdateThemePicker();
    return container;
}

function colorSelection(name) {
    const ele = document.createElement('label');
    ele.style = `
              display: flex;
              align-items: center;
          `;

    const input = document.createElement('input');
    input.type = 'color';
    input.value = getColor(name);
    input.addEventListener('input', () => {
        setColor(name, input.value, false);
    });
    ele.appendChild(input);

    const label = document.createElement('span');
    label.style = `margin-left: 10px;`;
    label.innerHTML = getReadableName(name);
    ele.appendChild(label);

    return ele;
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
function createThemePickerInner() {
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

export function downloadTheme() {
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

export function uploadTheme() {
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

function getReadableName(name) {
    return name.replace('--theme-', '').replace('colors-', '').replace('-wlv', '').replaceAll('-', ' ');
}
function getThemeVariableNames() {
    return Object.keys(themes.Default);
}

export function getColor(name) {
    const root = document.querySelector(':root');
    let color = getComputedStyle(root).getPropertyValue(name);
    if (!color) {
        sendToIframe(`get ${name}`);
        color = themes.Default[name];
    }
    return color;
}
export function setColor(name, color, update = true) {
    const root = document.querySelector(':root');
    root.style.setProperty(name, color);

    if (update) UpdateThemePicker();

    sendToIframe(`set ${name} ${color}`);
}

export function setTheme(themeName) {
    const theme = themes[themeName];
    Object.keys(theme).forEach((name) => {
        setColor(name, theme[name], false);
    });
    UpdateThemePicker();
}
