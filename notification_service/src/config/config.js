require("dotenv").config();

module.exports = {
  notificationServicePort: process.env.NOTIFICATION_SERVICE_PORT,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS
};