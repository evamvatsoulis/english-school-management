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
  },

  notification: {
    name: "notification-service",
    host: process.env.NOTIFICATION_SERVICE_HOST,
    port: process.env.NOTIFICATION_SERVICE_PORT
  },

  export: {
    name: "export-service",
    host: process.env.EXPORT_SERVICE_HOST,
    port: process.env.EXPORT_SERVICE_PORT
  }
};

module.exports = {
  apiGatewayPort: process.env.API_GATEWAY_PORT,
  frontendPort: process.env.FRONTEND_PORT,
  frontendHost: process.env.FRONTEND_HOST,
  services
};