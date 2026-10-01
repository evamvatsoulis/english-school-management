const express = require("express");
const config = require("./config/config");

const app = express();

app.use(express.json());

app.listen(config.exportServicePort, "0.0.0.0", () => {
  console.log(`Export Service is running at port ${config.exportServicePort}`);
});