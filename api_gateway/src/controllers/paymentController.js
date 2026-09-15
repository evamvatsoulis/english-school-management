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
}

module.exports = { getPayments, createPayment };