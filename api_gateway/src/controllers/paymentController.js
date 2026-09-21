const config = require('../config/config');

const getPayments = async (req, res) => {
    try {
        const response = await fetch(`http://${config.host}:${config.services.payment.port}/payments`);
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: "Payment service is currently unavailable" });
    }
};

const createPayment = async (req, res) => {
    try {
        const response = await fetch(
            `http://${config.host}:${config.services.payment.port}/payments`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req.body)
            }
        );
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: "Payment service is currently unavailable" });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(`http://${config.host}:${config.services.payment.port}/payments/${id}`);
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: "Payment service is currently unavailable" });
    }
};

const getPaymentByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;
        const response = await fetch(`http://${config.host}:${config.services.payment.port}/payments/students/${studentId}`);
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: "Payment service is currently unavailable" });
    }
};

const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `http://${config.host}:${config.services.payment.port}/payments/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req.body)
            }
        );
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: "Payment service is currently unavailable" });
    }
};

const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `http://${config.host}:${config.services.payment.port}/payments/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: "Payment service is currently unavailable" });
    }
};

module.exports = { getPayments, createPayment, getPaymentById, getPaymentByStudentId, updatePayment, deletePayment };