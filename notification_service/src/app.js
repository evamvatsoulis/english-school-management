const express = require("express");
const config = require("./config/config");
const healthRoutes = require('./routes/healthRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

app.use(express.json());
app.use('/health', healthRoutes);
app.use('/notification', notificationRoutes);

app.listen(config.notificationServicePort, "0.0.0.0", () => {
  console.log(`Notification Service is running at port ${config.notificationServicePort}`);
});