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

module.exports = { getPayments };