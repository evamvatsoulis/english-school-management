const express = require("express");
const config = require("./config/config");
const authRoutes = require('./routes/authRoutes');
const healthRoutes = require('./routes/healthRoutes');
const { testDbConnection } = require('./config/db');

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/health', healthRoutes);

app.listen(config.authServicePort, "0.0.0.0", () => {
  console.log(`Auth Service is running at http://${config.host}:${config.authServicePort}`);
});

testDbConnection();