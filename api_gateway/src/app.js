const express = require("express");
const config = require("./config/config");

const app = express();

app.use(express.json());

app.listen(config.apiGatewayPort, config.host, () => {
  console.log(`Api Gateway Service is running at http://${config.host}:${config.apiGatewayPort}`);
});