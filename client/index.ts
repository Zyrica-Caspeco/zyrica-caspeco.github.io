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
  // const voice = voices.find(({ lang, name }) => lang.startsWith('en-') && name.toLowerCase().includes('female'));
  const utterance = new SpeechSynthesisUtterance();
  utterance.voice = voice;
  utterance.text = msg;
  utterance.onend = start;
  speechSynthesis.speak(utterance);
  if (!speechSynthesis.speaking) {
    setTimeout(() => say(msg), 100);
  } else {
    r.stop();
    button.textContent = "Pratar";
    console.log("[BOT]", msg);
    messages.push({
      role: "assistant",
      content: msg,
    });
  }
}

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
      `Välkommen till ${resturantName}! Jag är en AI som kan hjälpa dig att boka bord.`
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

let button;

function createCopyAndRemoveRedundantThings(node: Node) {
  if (!node) return "";
    // Klona hela dokumentet
    let clonedDocument = node.cloneNode(true);

    // Ta bort alla <script> och <style>-taggar
    clonedDocument
      .querySelectorAll("script, style")
      .forEach((el) => el.remove());

    // Ta bort alla attribut från alla element
    clonedDocument.querySelectorAll("*").forEach((el) => {
      for (let i = el.attributes.length - 1; i >= 0; i--) {
        el.removeAttribute(el.attributes[i].name);
      }
    });

    let output = [...clonedDocument.querySelectorAll('*')].filter(el => 
        el.textContent.trim().length > 0
    ).filter(el =>
        !el.innerHTML.includes('<')
    ).map(el => {
        let tag = el.tagName.toLowerCase();
        let text = el.textContent.trim();
        
        // Skapa en strängrepresentation av varje element med dess taggar och text
        return `<${tag}>${text}</${tag}>`;
    }).join('');


    return output;
}


function waitFor() {
  const hej = createCopyAndRemoveRedundantThings(
    document.querySelector(".mainContainer")
  );
  const isDone = hej?.includes("Checkout");
  if (!isDone) {
    // console.log('waiting')
    // console.log('waiting hej',hej)
    setTimeout(waitFor, 100);
  } else {
    console.log(hej);
  }
}

waitFor();
