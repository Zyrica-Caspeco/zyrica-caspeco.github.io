const dotenv = require("dotenv");
const express = require("express");
const expressWs = require("express-ws");
const axios = require("axios");
dotenv.config();

async function askChatGPT(msg) {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "agera som en ai guide till ett resturang back office system. Du kan hjälpa användaren att hitta rätt i gränssnittet.",
        },
        { role: "user", content: "Jag vill ha hjälp att hitta artiklar" },
      ],
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
  connections.push(ws);
  console.log("new connection");
  ws.on("message", async (msg) => {
    console.log(`got ${msg}`);
    try {
      const message = await askChatGPT(msg);
      ws.send(message.content);
    } catch (e) {
      console.error(e);
    }
  });
});

app.listen(31337, () => {
  console.log("listening on port 31337");
});
