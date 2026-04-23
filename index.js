require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("アシタカAPI起動🔥");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "message が必要です"
      });
    }

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: [
        {
          role: "system",
          content: "あなたはアシタカです。やわらかく自然な日本語で返答してください。"
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    const reply = response.output_text;

    res.json({ reply });
  } catch (error) {
    console.error("chat error:", error);
    res.status(500).json({
      error: "サーバーエラー",
      detail: error.message
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`起動成功: ${port}`);
});
