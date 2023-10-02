import themes from "./themes.json";
import { sendToIframe } from "./iframe";

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

export function setTheme(themeName) {
    const theme = themes[themeName];
    Object.keys(theme).forEach((name) => {
        setColor(name, theme[name]);
    });
}

export function getReadableName(name) {
    return name.replace('--theme-', '').replace('colors-', '').replace('-wlv', '').replaceAll('-', ' ');
}
export function getThemeVariableNames() {
    return Object.keys(themes.Default);
}

export function printAllCaspecoElements() {
    const log = (ele) => console.log(ele);
    const classFilter = ele => {
        return ele.className.includes && ele.className.includes('caspeco');
    }
    const contentFilter = ele => ele.innerHTML.includes('caspeco');
    const contents  = [...document.querySelectorAll('script')].filter(contentFilter);
    const classes = [...document.querySelectorAll('*')].filter(classFilter);
    const elements = [...contents, ...classes];
    if (elements.length) {
        elements.forEach(log);
    } else {
        console.log('Could not find any Caspeco elements');
    }
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
export function setColor(name, color) {
    const root = document.querySelector(':root');
    root.style.setProperty(name, color);

    sendToIframe(`set ${name} ${color}`);
}
