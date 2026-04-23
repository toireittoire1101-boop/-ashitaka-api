const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// 確認用
app.get("/", (req, res) => {
  res.send("アシタカAPI起動🔥");
});

// 会話API
app.post("/chat", (req, res) => {
  const { message } = req.body;

  console.log("受け取った:", message);

  res.json({
    reply: `アシタカ応答: ${message}`
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("起動成功");
});
