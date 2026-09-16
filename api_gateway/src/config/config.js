require("dotenv").config();

const services = [
  {
    name: "student-service",
    port: process.env.STUDENT_SERVICE_PORT
  },
  {
    name: "payment-service",
    port: process.env.PAYMENT_SERVICE_PORT
  },
  {
    name: "auth-service",
    port: process.env.AUTH_SERVICE_PORT
  },
  {
    name: "class-service",
    port: process.env.CLASS_SERVICE_PORT
  }
];

module.exports = {
  apiGatewayPort: process.env.API_GATEWAY_PORT,
  studentServicePort: process.env.STUDENT_SERVICE_PORT,
  paymentServicePort: process.env.PAYMENT_SERVICE_PORT,
  authServicePort: process.env.AUTH_SERVICE_PORT,
  classServicePort: process.env.CLASS_SERVICE_PORT,
  host: process.env.HOST,
  services
};