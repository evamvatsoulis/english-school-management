const config = require('../config/config');

const getUsers = async (req, res) => {
    try {
        const response = await fetch(`http://${config.host}:${config.services.auth.port}/auth/users`);
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: "Auth service is currently unavailable" });
    }
};

const createUser = async (req, res) => {
    try {
        const response = await fetch(
            `http://${config.host}:${config.services.auth.port}/auth/register`,
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
        return res.status(503).json({ error: "Auth service is currently unavailable" });
    }
};

const login = async (req, res) => {
    try {
        const response = await fetch(
            `http://${config.host}:${config.services.auth.port}/auth/login`,
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
        return res.status(503).json({ error: "Auth service is currently unavailable" });
    }
};

module.exports = { getUsers, createUser, login };