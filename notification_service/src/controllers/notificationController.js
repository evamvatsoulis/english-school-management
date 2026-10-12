const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.emailUser,
        pass: config.emailPass
    }
});

const sendEmail = async (req, res) => {
    try {
        const { to, subject, html, attachments } = req.body;

        const info = await transporter.sendMail({
            from: `"English Institute" <${config.emailUser}>`,
            to: to,
            subject: subject,
            html: html,
            attachments: attachments
        });

        return res.status(200).json({ message: "Email sent" });
    } catch (err) {
        return res.status(500).json({ error: "Failed to send email" });
    }
};

module.exports = { sendEmail };