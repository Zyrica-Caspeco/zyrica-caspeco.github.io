import {
    downloadTheme,
    getColor,
    getReadableName,
    getThemeVariableNames,
    setColor,
    setTheme,
    uploadTheme
} from "./on-clicks";
import {css} from "./globals";
import themes from "./themes.json";

export const ele = document.createElement('div');
ele.appendChild(createThemePicker());
ele.appendChild(createSaveAndLoadTheme());

getThemeVariableNames().map(colorSelection).forEach(color => {
    ele.appendChild(color);
});

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
        setColor(name, input.value);
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
