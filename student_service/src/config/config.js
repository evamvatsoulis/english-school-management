require("dotenv").config();

module.exports = {
  studentServicePort: process.env.STUDENT_SERVICE_PORT,
  host: process.env.HOST
};