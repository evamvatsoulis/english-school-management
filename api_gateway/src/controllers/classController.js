const config = require('../config/config');

const createClass = async (req, res) => {
    try {
        const response = await fetch(
            `http://${config.host}:${config.classServicePort}/classes`,
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
    } catch (err) {
        return res.status(503).json({ error: err.message });
    }
};

module.exports = {createClass};