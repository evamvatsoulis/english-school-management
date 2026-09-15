const config = require('../config/config');

const getPayments = async (req, res) => {
    try {
        const response = await fetch(`http://${config.host}:${config.paymentServicePort}/payments`);
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: "Failed to fetch payments" });
    }
};

const createPayment = async (req, res) => {
    try {
        const response = await fetch(
            `http://${config.host}:${config.paymentServicePort}/payments`,
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
        return res.status(503).json({ error: "Failed to create payment" });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(`http://${config.host}:${config.paymentServicePort}/payments/${id}`);
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: "Failed to fetch payment" });
    }
};

const getPaymentByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;
        const response = await fetch(`http://${config.host}:${config.paymentServicePort}/payments/students/${studentId}`);
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: "Failed to fetch payment" });
    }
};

const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `http://${config.host}:${config.paymentServicePort}/payments/${id}`,
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
        return res.status(503).json({ error: "Failed to update payment" });
    }
};

module.exports = { getPayments, createPayment, getPaymentById, getPaymentByStudentId, updatePayment };