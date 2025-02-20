function require(name) {
  const ele = document.createElement("script");
  ele.src = `http://localhost:1337/${name}`;
  document.head.appendChild(ele);
}

const ele = document.createElement("link");
ele.rel = "stylesheet";
ele.href = `http://localhost:1337/css.less`;
document.head.appendChild(ele);

require("crawler.ts");
require("voice.ts");
require("client.ts");

function listen(msg) {
  r.stop();
  button.textContent = "Tänker";
  if (msg) {
    messages.push({
      role: "user",
      content: msg,
    });
  }
  const data = {
    messages: [...messages, description],
    model: "gpt-3.5-turbo",
    temperature: 0,
  };
  console.log("[USR]", msg);
  ws.send(JSON.stringify(data));
}

window.listen = listen;

function start() {
  button.textContent = "Lyssnar";
  button.onclick = stop;

  r = new window.webkitSpeechRecognition();
  r.continuous = true;
  r.onresult = (e) => {
    const text = e.results[e.resultIndex][0].transcript;
    listen(text);
  };
  r.start();

  if (firstTime) {
    firstTime = false;
    ws = new WebSocket("wss://www.zyrica.com/api/openai");
    ws.onmessage = (msg) => {
      const reset = document.querySelector(".editChoice button");
      reset?.click();

      setTimeout(() => {
        const data = JSON.parse(msg.data);
        setData(data);
      }, 100);

      start();
    };
    say(
      `Välkommen till ${restaurantName}! Jag är en AI som kan hjälpa dig att hantera din restaurang.`,
    );
  }
}

let r;

function stop() {
  button.textContent = "Starta";
  button.onclick = start;
  r.stop();

  messages = [];
  firstTime = true;
}

