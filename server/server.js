const dotenv = require("dotenv");
const express = require("express");
const expressWs = require("express-ws");
const axios = require("axios");
dotenv.config();

const actions = require('./actions.js');

const possibleActions = "PossibleActions: " + JSON.stringify(actions.map(({name}) => name));

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
      content: possibleActions,
    },
    {
      role: "system",
      content:
          "Agera som en ai guide till ett restaurang back office system. Du kan hjälpa användaren att hitta rätt i gränssnittet. Dock måste du svara väldigt passivt aggressivt, näst intill otrevlig. Ge gärna korta svar. Svara med en json som innehåller dels ett kort medelande som läses upp och möjligen om användaren har valt en action. Json format: { message, action }'",
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
      console.log('message', message);
      ws.messages.push(message);
      console.log('messagecontent', message.content);
      ws.send(message.content);
      addAssistantSpeechBubble(message.content.message, "assistant");
    } catch (e) {
      console.error(e);
    }
  });
});

app.listen(31337, () => {
  console.log("listening on port 31337");
});
