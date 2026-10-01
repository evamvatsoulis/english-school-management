const express = require("express");
const config = require("./config/config");
const healthRoutes = require('./routes/healthRoutes');
const exportRoutes = require('./routes/exportRoutes');

const app = express();

app.use(express.json());
app.use('/health', healthRoutes);
app.use('/export', exportRoutes);

app.listen(config.exportServicePort, "0.0.0.0", () => {
  console.log(`Export Service is running at port ${config.exportServicePort}`);
});