require("dotenv").config();

module.exports = {
  paymentServicePort: process.env.PAYMENT_SERVICE_PORT,
  studentServicePort: process.env.STUDENT_SERVICE_PORT,
  host: process.env.HOST
};