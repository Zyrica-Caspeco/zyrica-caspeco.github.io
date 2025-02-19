// TODO: gör så att crawlern kan spara om dommen i rätt format så att mankan skicka den till chatgpt för att generera actions.js

function createCopyAndRemoveRedundantThings(node: Node) {
  if (!node) return "";
  // Klona hela dokumentet
  let clonedDocument = node.cloneNode(true);

  // Ta bort alla <script> och <style>-taggar
  clonedDocument.querySelectorAll("script, style").forEach((el) => el.remove());

  // Ta bort alla attribut från alla element
  clonedDocument.querySelectorAll("*").forEach((el) => {
    for (let i = el.attributes.length - 1; i >= 0; i--) {
      el.removeAttribute(el.attributes[i].name);
    }
  });

  let output = [...clonedDocument.querySelectorAll("*")]
    .filter((el) => el.textContent.trim().length > 0)
    .filter((el) => !el.innerHTML.includes("<"))
    .map((el) => {
      let tag = el.tagName.toLowerCase();
      let text = el.textContent.trim();

      // Skapa en strängrepresentation av varje element med dess taggar och text
      return `<${tag}>${text}</${tag}>`;
    })
    .join("");

  return output;
}

function waitFor() {
  const cleanDom = createCopyAndRemoveRedundantThings(
    document.querySelector(".mainContainer"),
  );
  const isDone = cleanDom?.includes("Checkout");
  if (!isDone) {
    // console.log('waiting')
    // console.log('waiting hej',hej)
    setTimeout(waitFor, 100);
  } else {
    console.log(cleanDom);
  }
}
