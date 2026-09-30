const express = require("express");
const config = require("./config/config");

const app = express();

app.use(express.json());

app.listen(config.notificationServicePort, "0.0.0.0", () => {
  console.log(`Notification Service is running at port ${config.notificationServicePort}`);
});