const express = require("express");
const config = require("./config/config");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Student Service is running" });
});

app.listen(config.studentServicePort, config.host, () => {
  console.log(`Student Service is running at http://${config.host}:${config.studentServicePort}`);
});