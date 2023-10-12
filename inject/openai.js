/* global axios */

import { css } from "./globals";

const silentMode = true;

const script = document.createElement('script');
script.type = 'application/javascript';
script.src = `https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js`;
document.head.appendChild(script);


const resturantName = document.querySelector('h1').innerText;

let ws;

const description = {
    role: 'user',
    content: `
            Today: ${new Date().toISOString().slice(0, 10)}.
            
            Only answer with a json object with the following structure:
            {
                amountGuests: (integer or null),
                date: (YYYY-MM-DD-string or null),
                time: (HH:MM-string or null),
            }`,

};
let messages = [];

function listen(msg) {
    r.stop();
    button.textContent = 'Tänker';
    if (msg) {
        messages.push({
            role: 'user',
            content: msg,
        });
    }
    const data = {
        messages: [...messages, description],
        model: 'gpt-3.5-turbo',
        temperature: 0,
    }
    console.log('[USR]', msg);
    ws.send(JSON.stringify(data));
}

window.listen = listen;


function say(msg) {
    if (silentMode) {
        console.log('[BOT]', msg);
        messages.push({
            role: 'assistant',
            content: msg,
        });
        return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) {
        setTimeout(() => say(msg));
        return;
    }
    const voice = voices.find(({ lang, name }) => lang.startsWith('sv-'));
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
        button.textContent = 'Pratar';
        console.log('[BOT]', msg);
        messages.push({
            role: 'assistant',
            content: msg,
        });
    }
}

let r;

function setData(data) {
    function wait() {
        setTimeout(() => setData(data), 100);
    }

    const step = document.querySelectorAll('.editChoice button').length;
    if (step === 0) { // amountGuests
        if (!data.amountGuests) {
            say('Hur många är ni?');
            return;
        }
        ;
        const eles = [...document.querySelectorAll('#webBookingStart input')];
        const max = parseInt([...eles].pop().value);
        let guests = parseInt(data.amountGuests);
        if (guests < 1) guests = 1;
        if (max < guests) guests = max;

        const target = eles.find(({ value }) => value === guests.toString());
        if (target) {
            target.click();
        }
        wait();
    } else if (step === 1) { // date
        if (!data.date) {
            say('Vilken dag vill du boka?');
            return;
        }
        const eles = [...document.querySelectorAll('#webBookingStart button')].slice(3);
        const day = data.date.split('-').pop();
        const target = eles.find(({ innerText }) => innerText === day);
        if (target?.disabled) {
            [...document.querySelectorAll('#webBookingStart button')][2].click();
            console.log('next month');
        } else if (target) {
            target.click();
            console.log('done');
        }
        wait();
    } else if (step === 2) { // time
        if (!data.time) {
            say('Vilken tid vill du boka?');
            return;
        }
        if (![...document.querySelectorAll('#webBookingStart input')].length) {
            return wait();
        }

        const ele = [...document.querySelectorAll('#webBookingStart input')].find(e => e.nextSibling.innerText === data.time);
        if (ele) {
            ele.click();
            say('Jag hittade en tid som passar, var god dubbelkolla så att allt stämmer. Fyll sedan i dina kontaktuppgifter och klicka på boka för att slutföra din bokning.');
        } else {
            say('Jag kunde inte hitta den tiden, försök igen.');
        }
    }
}

let firstTime = true;

function start() {
    button.textContent = 'Lyssnar';
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
        ws = new WebSocket('wss://www.zyrica.com/api/openai');
        ws.onmessage = (msg) => {
            const reset = document.querySelector('.editChoice button');
            reset?.click();

            setTimeout(() => {
                const data = JSON.parse(msg.data);
                setData(data);
            }, 100);

            start();
        }
        say(`Välkommen till ${resturantName}! Jag är en AI som kan hjälpa dig att boka bord.`);
    }
}

function stop() {
    button.textContent = 'Starta';
    button.onclick = start;
    r.stop();

    messages = [];
    firstTime = true;
}

let button;

function test() {
    button = document.createElement('button');
    button.style = css`
      color: white;
      background: rgba(0, 0, 0, 0.8);
      padding: 10px 20px;
      border-radius: 10px;
    `
    button.textContent = 'Starta';
    button.onclick = start;
    const header = document.querySelector('header');
    header.children[2].remove();
    header.appendChild(button);
}

export default test;
