const config = require('../config/config');

const getUsers = async (req, res) => {
    try {
        const response = await fetch(`http://${config.host}:${config.authServicePort}/auth/users`);
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: "Failed to fetch users" });
    }
};

const login = async (req, res) => {
    try {
        const response = await fetch(
            `http://${config.host}:${config.authServicePort}/auth/login`,
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
        return res.status(503).json({ error: "Login failed" });
    }
};

module.exports = { getUsers, login };