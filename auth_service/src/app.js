const express = require("express");
const config = require("./config/config");
const registerRoutes = require('./routes/registerRoutes');
const { testDbConnection } = require('./config/db');

const app = express();

app.use(express.json());
app.use('/register', registerRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Auth Service is running" });
});

app.listen(config.authServicePort, config.host, () => {
  console.log(`Auth Service is running at http://${config.host}:${config.authServicePort}`);
});

testDbConnection();