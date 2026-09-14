const express = require("express");
const config = require("./config/config");
const paymentRoutes = require('./routes/paymentRoutes');
const healthRoutes = require('./routes/healthRoutes');
const { testDbConnection } = require('./config/db');

const app = express();

app.use(express.json());
app.use('/payments', paymentRoutes);
app.use('/health', healthRoutes);

app.listen(config.paymentServicePort, config.host, () => {
  console.log(`Payment Service is running at http://${config.host}:${config.paymentServicePort}`);
});

testDbConnection();