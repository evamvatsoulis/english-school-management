const path = require("path");
const fs = require("fs");
const config = require('../config/config');
const { emailBody } = require('../utils/emailBody');
const { paymentSchema, updatePaymentSchema } = require('../schemas/paymentSchema');
const {
    getPayments: getPaymentsRepository,
    createPayment: createPaymentRepository,
    getPaymentById: getPaymentByIdRepository,
    getPaymentsByStudentId: getPaymentsByStudentIdRepository,
    updatePayment: updatePaymentRepository,
    deletePayment: deletePaymentRepository
} = require('../repositories/paymentRepository');

const formatDate = (date) => new Date(date).toLocaleDateString('el-GR');

const notificationServiceUrl = `http://${config.notificationServiceHost}:${config.notificationServicePort}`;

const notFound = (result) => result.length === 0;

const doesNotExist = async (id) => {
    const result = await getPaymentByIdRepository(id);
    return !result;
};

const sendEmail = async (emailData) => {
    try {
        if (emailData.to === "student-service-error") {
            return { ok: false, error: "Failed to send email" }
        }

        const response = await fetch(
            `${notificationServiceUrl}/notification/email`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(emailData)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return { ok: response.ok, error: data.error };
        }

        return { ok: response.ok, message: data.message };

    } catch (error) {
        return { ok: false, error: "Notification service is currently unavailable" };
    }
};

const updatePaymentData = (value, payment) => {
    const studentId = value.studentId ?? payment.student_id;
    const amount = value.amount ?? payment.amount;
    const paymentMonth = value.paymentMonth ?? payment.payment_month;
    const paymentYear = value.paymentYear ?? payment.payment_year;
    const paymentDate = value.paymentDate ?? payment.payment_date;
    const paymentMethod = value.paymentMethod ?? payment.payment_method;
    const notes = value.notes ?? payment.notes;

    return { studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes };
};

const getPayments = async (req, res) => {
    try {
        const result = await getPaymentsRepository();

        if (notFound(result)) {
            return res.status(200).json({ message: "There are no payments", result: [] })
        }
        return res.status(200).json({ message: "Payments loaded successfully", result });
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch payments" });
    }
};

const createPayment = async (req, res) => {
    try {
        const { error, value } = paymentSchema.validate(req.body.paymentData);
        let emailStatus;

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        if (req.body.notificationData && !req.body.notificationData.email) {
            return res.status(400).json({ error: "Student does not have an email address" });
        }

        const { studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes } = value;
        const result = await createPaymentRepository(studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes);

        const logoPath = path.resolve(__dirname, '../../assets/logo.jpg');
        const logoBase64 = fs.readFileSync(logoPath).toString("base64");

        if (req.body.notificationData) {
            const email = req.body.notificationData.email;
            const htmlBody = `${emailBody(paymentMonth, paymentYear, formatDate(paymentDate), "cid:mylogo")}`;

            const emailData = {
                to: email,
                subject: "Payment Confirmation",
                html: htmlBody,
                attachments: [
                    {
                        filename: "logo.jpg",
                        content: logoBase64,
                        encoding: "base64",
                        cid: "mylogo",
                        contentDisposition: "inline"
                    }
                ]
            };

            const emailResponse = await sendEmail(emailData);

            if (!emailResponse.ok) {
                emailStatus = emailResponse.error;
            } else {
                emailStatus = emailResponse.message;
            }
        } else {
            emailStatus = "Payment confirmation email was not requested";
        }

        return res.status(201).json({ message: "Payment added", emailStatus, result });
    } catch (err) {
        return res.status(500).json({ error: "Failed to create payment" });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;

        const payment = await getPaymentByIdRepository(id);

        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }

        return res.status(200).json({ message: "Payment loaded successfully", result: payment });
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch payment" });
    }
};

const getPaymentsByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;

        const payments = await getPaymentsByStudentIdRepository(studentId);

        if (notFound(payments)) {
            return res.status(200).json({ message: "There are no payments", result: [] });
        }

        return res.status(200).json({ message: "Payments loaded successfully", result: payments });
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch payments" });
    }
};

const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { error, value } = updatePaymentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const currentPayment = await getPaymentByIdRepository(id);

        if (!currentPayment) {
            return res.status(404).json({ error: "Payment not found" });
        }

        const { studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes } = updatePaymentData(value, currentPayment);
        const result = await updatePaymentRepository(studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes, id);

        return res.status(200).json({ message: "Payment edited", result });
    } catch (err) {
        return res.status(500).json({ error: "Failed to update payment" });
    }
};

const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;

        if (await doesNotExist(id)) {
            return res.status(404).json({ message: "Payment not found" });
        }

        await deletePaymentRepository(id);

        return res.status(200).json({ message: "Payment deleted" });
    } catch (err) {
        return res.status(500).json({ error: "Failed to delete payment" });
    }
};

module.exports = { getPayments, createPayment, getPaymentById, getPaymentsByStudentId, updatePayment, deletePayment };