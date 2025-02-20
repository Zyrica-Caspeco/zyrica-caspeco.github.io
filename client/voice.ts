console.log("voice.ts");
const silentMode = true;

const ws = new WebSocket("ws://localhost:31337");
window.ws = ws;
ws.onmessage = (event) => {
  const { message, action } = JSON.parse(event.data);
  // todo: handle action, ladda actions.js och välj rätt action och surfa till url efter det
  say(message);
};

const messages = [];

function listen() {
  setButtonText("Lyssnar");
  const r = new window.webkitSpeechRecognition();
  r.lang = "sv-SE";
  r.continuous = false;
  r.onresult = (e) => {
    const text = e.results[e.resultIndex][0].transcript;
    setButtonText("Tänker");
    ws.send(text);
    addUserSpeechBubble(text);
  };
  r.start();
}
window.listen = listen;

function say(msg) {
  if (silentMode) {
    const textWithPrefix = `[BOT] ${msg}`;
    console.log(textWithPrefix);
    addAssistantSpeechBubble(textWithPrefix);
    messages.push({
      role: "assistant",
      content: msg,
    });
    return;
  }

  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) {
    setTimeout(() => say(msg));
    return;
  }

  const voice = voices.find(({ lang, name }) => lang.startsWith("sv-"));

  const utterance = new SpeechSynthesisUtterance();
  utterance.voice = voice;
  utterance.text = msg;
  utterance.onend = listen;

  if (speechSynthesis.pending) {
    setTimeout(() => say(msg), 100);
  } else {
    speechSynthesis.speak(utterance);
    setButtonText("Pratar");
  }
}

window.say = say;
