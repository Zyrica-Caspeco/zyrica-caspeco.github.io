console.log("voice.ts");
const silentMode = false;

const messages = [];

function start() {
  console.log("Start");
  setButtonText("Lyssnar");
}

function say(msg) {
  if (silentMode) {
    console.log("[BOT]", msg);
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
  utterance.text = "aaa " + msg;
  utterance.onend = start;

  if (speechSynthesis.pending) {
    setTimeout(() => say(msg), 100);
  } else {
    speechSynthesis.speak(utterance);
    setButtonText("Pratar");
  }
}

window.say = say;
