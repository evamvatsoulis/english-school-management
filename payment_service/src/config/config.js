require("dotenv").config();

module.exports = {
  paymentServicePort: process.env.PAYMENT_SERVICE_PORT,
  notificationServicePort: process.env.NOTIFICATION_SERVICE_PORT,
  notificationServiceHost: process.env.NOTIFICATION_SERVICE_HOST
};