const express = require("express");
const path = require("path");
const data = require(path.resolve(__dirname, "../usernames.json"));

function GenerateRandomNumber(max) {
  return Math.floor(Math.random() * max);
}
var reqCount = 0;
const app = express();

app.get("/", (req, res) => res.send("Hello Loser!"));

app.post("/random", (req, res) => {
  var max = 100;
  if (req.query.max != null) {
    max = parseInt(req.query.max);
  }
  reqCount++;
  res.send({ request: reqCount, number: GenerateRandomNumber(max).toString() });
});

async function myAsyncFilterFunc(u, start) {
  return new Promise((res) => {
    u.substring(0, start.length) == start;
  });
}

app.post("/username", async (req, res) => {
  var start = "";
  if (req.query.start != null) {
    start = req.query.start;
  }

  if (start != "") {
    if (start.length > 3) {
      start = start.substring(0, 3);
    }
    //BUG ->>

    var filteredUsernames = [];
    data.usernames.forEach((u) => {
      if (u.substring(0, start.length) == start) {
        filteredUsernames.push(u);
      }
    });
    res.send(filteredUsernames[GenerateRandomNumber(filteredUsernames.length)]);
  } else {
    res.send("");
  }
});

app.listen(4000, () => console.log("Server is listening on port 4000"));
