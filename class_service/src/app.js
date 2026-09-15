const express = require("express");
const config = require("./config/config");
const { testDbConnection } = require('./config/db');

const app = express();

app.use(express.json());

app.listen(config.classServicePort, config.host, () => {
  console.log(`Class Service is running at http://${config.host}:${config.classServicePort}`);
});

testDbConnection();