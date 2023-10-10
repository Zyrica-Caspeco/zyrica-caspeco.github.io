/* global axios */

const script = document.createElement('script');
script.type = 'application/javascript';
script.src = `https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js`;
document.head.appendChild(script);


const resturantName = document.querySelector('h1').innerText;

const messages = [{
    role: 'system',
    content: `Act as a booking voice bot for ${resturantName}. Keep it short.`,
}];

const config = {
    timeout: 30000,
}

async function openai(messages) {
    const data = {
        messages,
        model: 'gpt-3.5-turbo',
        temperature: 0.2,
    };
    console.log('asking chat bot', data);
    console.time();
    const result = await axios.post('https://zyrica.com/api/openai', data, config);
    console.timeEnd();
    return result.data;
}

async function test() {
    console.log('Open AI');

    const resturantName = document.querySelector('h1').innerText;
    const messages = [{
        role: 'system',
        content: `Act as a booking voice bot for ${resturantName}. Keep it short.`,
    }];
    const data = {
        messages,
        model: 'gpt-3.5-turbo',
        temperature: 0.2
    }
    const ws = new WebSocket('ws://localhost:31337/api/openai');
    ws.send(JSON.stringify(data))
    console.log(ws);
}

export default test;