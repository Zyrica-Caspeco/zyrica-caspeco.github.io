function createCopyAndRemoveRedundantThings(node: Node) {
    function cleanDOMCopy() {
    // Klona hela dokumentet
    let clonedDocument = node.cloneNode(true);

    // Ta bort alla <script> och <style>-taggar
    clonedDocument.querySelectorAll('script, style').forEach(el => el.remove());

    // Ta bort alla attribut från alla element
    clonedDocument.querySelectorAll('*').forEach(el => {
        for (let i = el.attributes.length - 1; i >= 0; i--) {
            el.removeAttribute(el.attributes[i].name);
        }
    });

    return clonedDocument;
}


// Exempel: Logga den rensade DOM-strukturen som HTML
let cleanedDOM = cleanDOMCopy();
console.log(cleanedDOM.documentElement.outerHTML);
}

window.test = createCopyAndRemoveRedundantThings;
console.log('test() för att köra funktionen');
export default createCopyAndRemoveRedundantThings;