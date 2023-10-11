/* global axios */

const script = document.createElement('script');
script.type = 'application/javascript';
script.src = `https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js`;
document.head.appendChild(script);


const resturantName = document.querySelector('h1').innerText;

let messages = [];

const config = {
    timeout: 30000,
}

let ws;

function listen(msg) {
    if (msg) {
        messages.push({
            role: 'user',
            content: msg,
        });
    }
    const data = {
        messages,
        model: 'gpt-3.5-turbo',
        stream: true,
        temperature: 0.2
    }
    ws.send(JSON.stringify(data));
}

window.listen = listen;

function isString(data) {
    return typeof data === 'string';
}


async function test() {
    console.log('Open AI');
    ws = new WebSocket('wss://www.zyrica.com/api/openai');

    ws.onopen = () => {
        const resturantName = document.querySelector('h1').innerText;
        messages = [{
            role: 'system',
            content: `Dagens datum är ${new Date().toISOString().slice(0, 10)}.
            
            Fyll i json objektet nedan:
            {
                amountGuests: (int),
                amountChildren: (int),
                date: (YYYY-MM-DD),
                time: (HH:MM),
            }
            
            Ange endast de värden som du fått svar på.
            `,

        }];
        window.messages = messages;
        listen();
    }

    ws.onmessage = ({ data }) => {
        const msg = isString(data) && data ? data : ' ';
        if (messages[messages.length - 1].role === 'assistant') {
            messages[messages.length - 1].content += msg;
        } else {
            messages.push({
                role: 'assistant',
                content: msg,
            });
        }
        say(msg);
    }
}


function say(msg) {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) {
        setTimeout(() => say(msg));
        return;
    }
    const voice = voices.find(({ lang, name }) => lang.startsWith('en-') && name.toLowerCase().includes('female'));
    const utterance = new SpeechSynthesisUtterance();
    utterance.voice = voice;
    utterance.text = msg;
    speechSynthesis.speak(utterance);
    if (!speechSynthesis.speaking) {
        setTimeout(() => say(msg), 100);
    } else {
        messages.push({
            role: 'assistant',
            content: msg,
        })
    }
}

let r = new window.webkitSpeechRecognition();
r.continuous = true;
r.onresult = (e) => {
    const text = e.results[e.resultIndex][0].transcript;
    listen(text);
};

const firstTime = true;

function start() {
    button.textContent = 'Stop';
    button.onclick = stop;
    r.start();

    if (firstTime) {
        say(`Welcome to ${resturantName}! Please make your `)
    }
}

function stop() {
    button.textContent = 'Listen';
    button.onclick = start;
    r.stop();
}

const button = document.createElement('button');
button.textContent = 'Listen';
button.onclick = start;
const header = document.querySelector('header');
header.children[2].remove();
header.appendChild(button);


export default test;