require("dotenv").config();

module.exports = {
  apiGatewayPort: process.env.API_GATEWAY_PORT,
  studentServicePort: process.env.STUDENT_SERVICE_PORT,
  paymentServicePort: process.env.PAYMENT_SERVICE_PORT,
  authServicePort: process.env.AUTH_SERVICE_PORT,
  host: process.env.HOST
};