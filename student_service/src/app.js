const express = require("express");
const config = require("./config/config");
const studentRoutes = require('./routes/studentRoutes');
const healthRoutes = require('./routes/healthRoutes');
const { testDbConnection } = require('./config/db');

const app = express();

app.use(express.json());
app.use('/students', studentRoutes);
app.use('/health', healthRoutes);

app.listen(config.studentServicePort, "0.0.0.0", () => {
  console.log(`Student Service is running at http://${config.host}:${config.studentServicePort}`);
});

testDbConnection();