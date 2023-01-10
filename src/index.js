const express = require("express");
const path = require("path");
const data = require(path.resolve(__dirname, "../usernames.json"));

function GenerateRandomNumber(max) {
  return Math.floor(Math.random() * max);
}
var reqCount = 0;
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/random", (req, res) => {
  var max = 100;
  if (req.query.max != null) {
    max = parseInt(req.query.max);
  }
  reqCount++;
  res.send({ request: reqCount, number: GenerateRandomNumber(max).toString() });
});

app.post("/username", (req, res) => {
  res.send(data.usernames[GenerateRandomNumber(data.usernames.length)]);
});

app.listen(4000, () => console.log("Server is listening on port 4000"));
