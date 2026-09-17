require("dotenv").config();

const services = {
  student: {
    port: process.env.STUDENT_SERVICE_PORT
  }
}

module.exports = {
  paymentServicePort: process.env.PAYMENT_SERVICE_PORT,
  host: process.env.HOST,
  services
};