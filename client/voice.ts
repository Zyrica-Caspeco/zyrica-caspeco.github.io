// TODO Importera från action.js
const actions = [
  { name: "No action" },
  {
    name: "Artikelregister - artiklar",
    url: "https://rms.dev.caspeco.net/prim/articles",
  },
  {
    name: "Artikelregister - kattegorier",
    url: "https://rms.dev.caspeco.net/prim/categories",
  },
  { name: "Översikt", url: "https://rms.dev.caspeco.net/dashboard" },
  {
    name: "Personal - Lön - Listor",
    url: "https://reverseproxy-cloud.dev.caspeco.net/payroll/lists",
  },
  {
    name: "Personal - Dokument",
    url: "https://reverseproxy-cloud.dev.caspeco.net/communication/documents",
  },
  {
    name: "Bokning - Bokningar",
    url: "https://rms.dev.caspeco.net/booking/timetable/",
  },
  {
    name: "Bokning - Kommunikation",
    url: "https://rms.dev.caspeco.net/booking/timetable/",
  },
  {
    name: "Bokning - Administrera",
    url: "https://rms.dev.caspeco.net/booking/administration/webrules",
  },
  {
    name: "Bokning - Filmer",
    url: "https://rms.dev.caspeco.net/booking/support/videos/",
  },
  {
    name: "Analys - översikt",
    url: "https://reverseproxy-cloud.dev.caspeco.net/air/landingPage",
  },
  {
    name: "Analys - filmer",
    url: "https://reverseproxy-cloud.dev.caspeco.net/support/videos",
  },
  {
    name: "Analys - utfall",
    url: "https://reverseproxy-cloud.dev.caspeco.net/air/result",
  },
  {
    name: "Analys - editera dashboards",
    url: "https://reverseproxy-cloud.dev.caspeco.net/air/dashboard",
  },
  {
    name: "Analys - rapporter",
    url: "https://reverseproxy-cloud.dev.caspeco.net/reports/reportgenerator",
  },
  {
    name: "Analys - ändra rapporter",
    url: "https://reverseproxy-cloud.dev.caspeco.net/reports/edittemplate",
  },
  {
    name: "Analys - datakällor",
    url: "https://reverseproxy-cloud.dev.caspeco.net/reports/dynamicdataprovider",
  },
  {
    name: "Mina sidor - profil",
    url: "https://reverseproxy-cloud.dev.caspeco.net/me/profile",
  },
  {
    name: "Mina sidor - meddelanden",
    url: "https://reverseproxy-cloud.dev.caspeco.net/communication/inbox",
  },
  {
    name: "Kampanjer",
    url: "https://reverseproxy-cloud.dev.caspeco.net/checkoutMenu/campaigns",
  },
  {
    name: "Kassa - översikt",
    url: "https://rms.dev.caspeco.net/checkout/merchant/edit/1b283005-f965-4d66-a8e4-139ec711277e/stats",
  },
  {
    name: "Kassa - platser",
    url: "https://rms.dev.caspeco.net/checkout/places/list",
  },
  {
    name: "Kassa - menyer",
    url: "https://rms.dev.caspeco.net/checkout/menu/list?merchantId=1b283005-f965-4d66-a8e4-139ec711277e",
  },
  {
    name: "Kassa - redovisning",
    url: "https://rms.dev.caspeco.net/checkout/settings/accounting",
  },
];

console.log("voice.ts");
window.silentMode = true;

const ws = new WebSocket("ws://localhost:31337");
window.ws = ws;
ws.onmessage = (event) => {
  setButtonText("Lyssna");
  console.log("got", event.data);
  let message, actionName;
  try {
    const parsedData = JSON.parse(event.data);
    message = parsedData.message;
    actionName = parsedData.action;
  } catch (error) {
    message = event.data;
  }

  const action = actions.find((a) => a.name === actionName);
  if (action?.url) {
    // document.location.href = action.url;
    // todo: lägg in knapp
  }
  // todo: handle action, ladda actions.js och välj rätt action och surfa till url efter det
  say(message);
};

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
  addAssistantSpeechBubble(msg);
  if (window.silentMode) {
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
  // utterance.onend = listen;

  if (speechSynthesis.pending) {
    setTimeout(() => say(msg), 100);
  } else {
    speechSynthesis.speak(utterance);
    // setButtonText("Pratar");
  }
}

window.say = say;
