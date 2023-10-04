export const scriptSrc = document.currentScript.src;
export const isLocalhost = scriptSrc.includes('localhost');
export const css = s => s;
export const isIframe = window.self !== window.top;

export function load(key) {
    const json = localStorage.getItem(key);
    return json ? JSON.parse(json) : json;
}
export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
