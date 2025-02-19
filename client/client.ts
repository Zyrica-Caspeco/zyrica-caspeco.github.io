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

  const button = document.createElement("button");
  button.textContent = "Start";
  button.onclick = () => {
    say(
      "Hej och välkommen till Caspecos AI assistent, vad kan jag hjlpa till med!",
    );
  };
  shadow.appendChild(button);

  window.button = button;
}

createDomNode();

window.setButtonText = setButtonText;
