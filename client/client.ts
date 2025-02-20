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

  const lyssna = document.createElement("button");
  lyssna.textContent = "Lyssna";
  lyssna.onclick = () => {
    listen();
  };
  lyssna.className = "settings-button"

  const prata = document.createElement("button");
  prata.textContent = "Uppläsning av";
  prata.onclick = () => {
    window.silentMode = !window.silentMode;
    prata.textContent = "Uppläsning " + (window.silentMode ? "av" : "på");
  };
  prata.className = "settings-button"

  window.button = lyssna;

  // Create the chat button
  const chatButton = document.createElement("button");
  chatButton.innerText = "Öppna AI-chatt";
  chatButton.classList.add("open-button");
  chatButton.addEventListener("click", openForm);
  document.body.appendChild(chatButton);

  // Create the chat popup
  const chatPopup = document.createElement("div");
  chatPopup.classList.add("form-popup");
  chatPopup.id = "myForm";

  const formContainer = document.createElement("div");
  formContainer.classList.add("form-container");

  const chatTitle = document.createElement("h1");
  chatTitle.innerText = "Caspecos AI-Assistent";

  let chatMessages = document.createElement("div");
  chatMessages.classList.add("chat-messages");

  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = "Vad vill du veta?";
  inputField.classList.add("chat-input");
  inputField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

  const sendButton = document.createElement("button");
  sendButton.type = "button";
  sendButton.classList.add("btn");
  sendButton.innerText = "Skicka";
  sendButton.addEventListener("click", sendMessage);

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.classList.add("btn", "cancel");
  closeButton.innerText = "Stäng";
  closeButton.addEventListener("click", closeForm);

  const bottomContainer = document.createElement("div");
  bottomContainer.classList.add("bottom-container");
  bottomContainer.appendChild(prata)
  bottomContainer.appendChild(lyssna)
  bottomContainer.appendChild(closeButton)

  inputContainer.appendChild(inputField);
  inputContainer.appendChild(sendButton);

  formContainer.appendChild(chatTitle);
  formContainer.appendChild(chatMessages);
  formContainer.appendChild(inputContainer);
  formContainer.appendChild(bottomContainer);
  chatPopup.appendChild(formContainer);
  document.body.appendChild(chatPopup);

  function openForm() {
    chatPopup.style.display = "block";
  }

  function closeForm() {
    chatPopup.style.display = "none";
  }

  function createSpeechBubble(text, role, url) {
    const messageBubble = document.createElement("div");
    if (role === "user") {
      messageBubble.classList.add("speech-bubble-user");
    } else {
      messageBubble.classList.add("speech-bubble-assistant");
    }
    messageBubble.innerText = text;
    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.innerText = "\n Klicka här för att komma dit."
      a.classList.add("url-link");
      messageBubble.appendChild(a);
    }
    chatMessages.appendChild(messageBubble);
    messageBubble.scrollIntoView();
  }

  function sendMessage() {
    const messageText = inputField.value.trim();
    if (messageText === "") return;

    createSpeechBubble(messageText, "user", undefined);
    ws.send(messageText);
    inputField.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addUserSpeechBubble(text) {
    createSpeechBubble(text, "user", undefined);
  }

  function addAssistantSpeechBubble(text, url) {
    createSpeechBubble(text, "assistant", url);
  }

  window.addUserSpeechBubble = addUserSpeechBubble;
  window.addAssistantSpeechBubble = addAssistantSpeechBubble;

  createSpeechBubble(
    "Hej och välkommen till Caspecos AI-Assistent, vad kan jag hjälpa till med?",
    "assistant",
  );
}

createDomNode();

window.setButtonText = setButtonText;
