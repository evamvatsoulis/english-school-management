const express = require("express");
const config = require("./config/config");
const healthRoutes = require('./routes/healthRoutes');
const classRoutes = require('./routes/classRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const { testDbConnection } = require('./config/db');

const app = express();

app.use(express.json());
app.use('/health', healthRoutes);
app.use('/classes', classRoutes);
app.use('/enrollments', enrollmentRoutes);

app.listen(config.classServicePort, config.host, () => {
  console.log(`Class Service is running at http://${config.host}:${config.classServicePort}`);
});

testDbConnection();