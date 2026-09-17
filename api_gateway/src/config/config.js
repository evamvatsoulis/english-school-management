require("dotenv").config();

const services = {
  student: {
    name: "student-service",
    port: process.env.STUDENT_SERVICE_PORT
  },

  payment: {
    name: "payment-service",
    port: process.env.PAYMENT_SERVICE_PORT
  },

  class: {
    name: "class-service",
    port: process.env.CLASS_SERVICE_PORT
  },

  auth: {
    name: "auth-service",
    port: process.env.AUTH_SERVICE_PORT
  }
};

module.exports = {
  apiGatewayPort: process.env.API_GATEWAY_PORT,
  host: process.env.HOST,
  services
};