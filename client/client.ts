console.log("client");
function setButtonText(text) {
  window.button.textContent = text;
}

// function addUserSpeechBubble(text) {
//   createSpeechBubble(text, "user");
// }

// function addAssistantSpeechBubble(text) {
//   createSpeechBubble(text, "assistant");
// }

function createDomNode() {
  const node = document.createElement("div");
  node.id = "ai-helper";
  node.textContent = "Hello world";
  const shadow = node.attachShadow({ mode: "open" });
  document.body.appendChild(node);

  // TODO: ladda in css.less i shadow dommen

  const button = document.createElement("button");
  button.textContent = "Start";
  button.onclick = () => {
    // ws.send("Jag skulle vilja uppdatera priset på en pizza");
    // listen();
    // say("Hej och välkommen till Caspecos AI Assistent, vad kan jag hjlpa till med?");
  };
  shadow.appendChild(button);

  window.button = button;

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

  inputContainer.appendChild(inputField);
  inputContainer.appendChild(sendButton);

  formContainer.appendChild(chatTitle);
  formContainer.appendChild(chatMessages);
  formContainer.appendChild(inputContainer);
  formContainer.appendChild(closeButton);
  chatPopup.appendChild(formContainer);
  document.body.appendChild(chatPopup);

  function openForm() {
    chatPopup.style.display = "block";
  }

  function closeForm() {
    chatPopup.style.display = "none";
  }

  function createSpeechBubble(text, role) {
    const messageBubble = document.createElement("div");
    if (role === "user") {
      messageBubble.classList.add("speech-bubble-user");
    } else {
      messageBubble.classList.add("speech-bubble-assistant");
    }
    messageBubble.innerText = text;
    chatMessages.appendChild(messageBubble);
  }

  function sendMessage() {
    const messageText = inputField.value.trim();
    if (messageText === "") return;

    createSpeechBubble(messageText, "user");
    // addUserSpeechBubble(messageText);
    ws.send(messageText);
    inputField.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addUserSpeechBubble(text) {
    createSpeechBubble(text, "user");
  }

  function addAssistantSpeechBubble(text) {
    createSpeechBubble(text, "assistant");
  }

  window.addUserSpeechBubble = addUserSpeechBubble;
  window.addAssistantSpeechBubble = addAssistantSpeechBubble;


  createSpeechBubble(
    "Hej och välkommen till Caspecos AI-Assistent, vad kan jag hjälpa till med?",
    "assistant"
  );

  // Inject styles
  document.head.insertAdjacentHTML(
    "beforeend",
    `
<style>
    .open-button {
        background-color: #93B9e1;
        color: white;
        padding: 16px 20px;
        border: none;
        cursor: pointer;
        opacity: 0.8;
        position: fixed;
        top: 10px;
        right: 28px;
        width: 200px;
        border-radius: 20px;
    }
    .form-popup {
        display: none;
        position: fixed;
        top: 0;
        right: 15px;
        border: 3px solid #f1f1f1;
        z-index: 9;
        background: white;
        min-width: 250px;
        max-width: 400px;
        min-height: 300px;
        padding: 10px;
        border-radius: 10px;
    }
    .form-container {
        display: flex;
        flex-direction: column;
    }
    .chat-messages {
        min-height: 200px;
        overflow-y: auto;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        display: flex;
        flex-direction: column;
    }
    .speech-bubble-user {
        background: #04AA6D;
        color: white;
        padding: 10px;
        border-radius: 10px;
        margin: 5px 0;
        max-width: 80%;
        align-self: flex-end;
    }
    .speech-bubble-assistant {
        background: #0096C7;
        color: white;
        padding: 10px;
        border-radius: 10px;
        margin: 5px 0;
        max-width: 80%;
        align-self: flex-start;
    }
    .input-container {
        display: flex;
        gap: 5px;
        padding: 10px;
    }
    .chat-input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .form-container .btn {
        background-color: #04AA6D;
        color: white;
        padding: 10px;
        border: none;
        cursor: pointer;
        border-radius: 5px;
    }
    .form-container .cancel {
        background-color: red;
    }
</style>
`
  );
}

createDomNode();

window.setButtonText = setButtonText;
