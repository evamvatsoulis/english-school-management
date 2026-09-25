require("dotenv").config();

const services = {
  student: {
    name: "student-service",
    host: process.env.STUDENT_SERVICE_HOST,
    port: process.env.STUDENT_SERVICE_PORT
  },

  payment: {
    name: "payment-service",
    host: process.env.PAYMENT_SERVICE_HOST,
    port: process.env.PAYMENT_SERVICE_PORT
  },

  class: {
    name: "class-service",
    host: process.env.CLASS_SERVICE_HOST,
    port: process.env.CLASS_SERVICE_PORT
  },

  auth: {
    name: "auth-service",
    host: process.env.AUTH_SERVICE_HOST,
    port: process.env.AUTH_SERVICE_PORT
  }
};

module.exports = {
  apiGatewayPort: process.env.API_GATEWAY_PORT,
  host: process.env.HOST,
  services
};