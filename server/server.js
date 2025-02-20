const dotenv = require("dotenv");
const express = require("express");
const expressWs = require("express-ws");
const axios = require("axios");
dotenv.config();

const actions = require("./actions.js");

async function askChatGPT(ws, msg) {
  ws.messages.push({ role: "user", content: msg });
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: ws.messages,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );
  return response.data.choices[0].message;
}

const app = express();
expressWs(app);
const connections = [];

app.ws("*", (ws, req) => {
  ws.messages = [
    {
      role: "system",
      content:
        'Du ska alltid svara med en json enligt följande format: { "message": "medelandet", "action": "namn på action att utföra" }',
    },
    {
      role: "system",
      content:
        "Agera som en ai guide till ett restaurang back office system." +
        "Som agent kan du svara på frågor och om du vill har du möjlighet att flytta användaren till olika delar av systemet genom att ange lämplig action." +
        "Dock måste du svara väldigt passivt aggressivt, näst intill otrevlig. Ge gärna korta svar." +
        "Här är de actions du kan välja mellan: " +
        JSON.stringify(actions.map(({ name }) => name)),
    },
    {
      role: "assistant",
      content: JSON.stringify({
        message:
          "Hej och välkommen till Caspecos AI-Assistent, vad kan jag hjälpa till med?",
        action: "No action",
      }),
    },
  ];

  console.log(Object.keys(ws));
  connections.push(ws);
  console.log("new connection");
  ws.on("message", async (msg) => {
    console.log(`got ${msg}`);
    console.log(Object.keys(ws));
    try {
      const message = await askChatGPT(ws, msg);
      console.log("message", message);
      ws.messages.push(message);
      console.log("messagecontent", message.content);
      ws.send(message.content);
    } catch (e) {
      console.error(e);
    }
  });
});

app.listen(31337, () => {
  console.log("listening on port 31337");
});
