const express = require("express");
const config = require("./config/config");
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const healthRoutes = require('./routes/healthRoutes');
const { testDbConnection } = require('./config/db');

const app = express();

app.use(express.json());
app.use('/', registerRoutes);
app.use('/login', loginRoutes);
app.use('/health', healthRoutes);

app.listen(config.authServicePort, config.host, () => {
  console.log(`Auth Service is running at http://${config.host}:${config.authServicePort}`);
});

testDbConnection();