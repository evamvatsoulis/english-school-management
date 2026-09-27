const express = require("express");
const config = require("./config/config");
const paymentRoutes = require('./routes/paymentRoutes');
const healthRoutes = require('./routes/healthRoutes');
const { testDbConnection } = require('./config/db');

const app = express();

app.use(express.json());
app.use('/payments', paymentRoutes);
app.use('/health', healthRoutes);

app.listen(config.paymentServicePort, "0.0.0.0", () => {
  console.log(`Payment Service is running at port ${config.paymentServicePort}`);
});

testDbConnection();