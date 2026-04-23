const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("アシタカAPI起動🔥");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("起動成功");
});
