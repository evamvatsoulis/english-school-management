const express = require("express");
const config = require("./config/config");
const { testDbConnection } = require('./config/db');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Payment Service is running" });
});

app.listen(config.studentServicePort, config.host, () => {
  console.log(`Payment Service is running at http://${config.host}:${config.paymentServicePort}`);
});

testDbConnection();