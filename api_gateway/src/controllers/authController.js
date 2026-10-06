const config = require('../config/config');

const authServiceUrl = `http://${config.services.auth.host}:${config.services.auth.port}`;

const getUsers = async (req, res) => {
    try {
        const response = await fetch(`${authServiceUrl}/auth/users`);
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: "Auth service is currently unavailable" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `${authServiceUrl}/auth/users/${id}`,
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
        return res.status(503).json({ error: "Auth service is currently unavailable" });
    }
};

const register = async (req, res) => {
    try {
        const response = await fetch(
            `${authServiceUrl}/auth/register`,
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
            `${authServiceUrl}/auth/login`,
            {
                signal: AbortSignal.timeout(5000),
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

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `${authServiceUrl}/auth/users/${id}`,
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
        return res.status(503).json({ error: "Auth service is currently unavailable" });
    }
};

module.exports = { getUsers, updateUser, register, login, deleteUser };