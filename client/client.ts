console.log("client");
function setButtonText(text) {
  window.button.textContent = text;
}

function createDomNode() {
  const node = document.createElement("div");
  node.id = "ai-helper";
  node.textContent = "Hello world";
  const shadow = node.attachShadow({ mode: "open" });
  document.body.appendChild(node);

  // TODO: ladda in css.less i shadow dommen
  // TODO: skapa en vy för medelanden

  const button = document.createElement("button");
  button.textContent = "Start";
  button.onclick = () => {
    ws.send("Jag skulle vilja uppdatera priset på en pizza");
    // listen();
    // say("Hej och välkommen till Caspecos AI Assistent, vad kan jag hjlpa till med?");
  };
  shadow.appendChild(button);

  window.button = button;
}

createDomNode();

window.setButtonText = setButtonText;
