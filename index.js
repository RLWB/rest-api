const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.get("/users", (req, res) => {
  const user = fs.readFileSync("./user.json", "utf8");
  res.send(JSON.parse(user));
});
app.put("/users", (req, res) => {
  const { status } = req.body;
  if (!status) {
    const user = fs.readFileSync("./user.json", "utf8");
    const formate = JSON.parse(user);
    formate.total += 1;
    fs.writeFileSync("./user.json", JSON.stringify(formate));
    res.send(formate);
  } else {
    const user = fs.readFileSync("./user.json", "utf8");
    const formate = JSON.parse(user);
    formate.actived += 1;
    fs.writeFileSync("./user.json", JSON.stringify(formate));
    res.send(formate);
  }
});
app.listen(PORT, (res) => {
  console.log("Server is running in http://localhost:" + PORT);
});
