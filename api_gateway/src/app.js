const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const healthRoutes = require('./routes/healthRoutes');
const studentRoutes = require('./routes/studentRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const classRoutes = require('./routes/classRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const authRoutes = require('./routes/authRoutes');
const exportRoutes = require('./routes/exportRoutes');

const app = express();

app.use(cors({ origin: [`http://localhost:${config.frontendPort}`, `http://${config.frontendHost}:${config.frontendPort}`] }));

app.use(express.json());
app.use('/health', healthRoutes);
app.use('/students', studentRoutes);
app.use('/payments', paymentRoutes);
app.use('/classes', classRoutes);
app.use('/enrollments', enrollmentRoutes);
app.use('/auth', authRoutes);
app.use('/export', exportRoutes);

app.listen(config.apiGatewayPort, "0.0.0.0", () => {
  console.log(`Api Gateway Service is running at port ${config.apiGatewayPort}`);
});