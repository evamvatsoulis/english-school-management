const express = require("express");
const config = require("./config/config");
const healthRoutes = require('./routes/healthRoutes');
const studentRoutes = require('./routes/studentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use('/health', healthRoutes);
app.use('/students', studentRoutes);
app.use('/payments', paymentRoutes);
app.use('/auth', authRoutes);

app.listen(config.apiGatewayPort, config.host, () => {
  console.log(`Api Gateway Service is running at http://${config.host}:${config.apiGatewayPort}`);
});