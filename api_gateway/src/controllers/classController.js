const config = require('../config/config');

const classServiceUrl = `http://${config.services.class.host}:${config.services.class.port}`;

const createClass = async (req, res) => {
    try {
        const response = await fetch(
            `${classServiceUrl}/classes`,
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
    } catch (err) {
        return res.status(503).json({ error: "Class service is currently unavailable" });
    }
};

const getClasses = async (req, res) => {
    try {
        const response = await fetch(`${classServiceUrl}/classes`, { signal: AbortSignal.timeout(5000) });
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (err) {
        return res.status(503).json({ error: "Class service is currently unavailable" });
    };
};

const getClassById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(`${classServiceUrl}/classes/${id}`, { signal: AbortSignal.timeout(5000) });
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (err) {
        return res.status(503).json({ error: "Class service is currently unavailable" });
    };
};

const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `${classServiceUrl}/classes/${id}`,
            {
                signal: AbortSignal.timeout(5000),
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req.body)
            }
        );
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (err) {
        return res.status(503).json({ error: "Class service is currently unavailable" });
    }
};

const deactivateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `${classServiceUrl}/classes/${id}/deactivate`,
            {
                signal: AbortSignal.timeout(5000),
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req.body)
            }
        );
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (err) {
        return res.status(503).json({ error: "Class service is currently unavailable" });
    }
};

const activateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `${classServiceUrl}/classes/${id}/activate`,
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
    } catch (err) {
        return res.status(503).json({ error: "Class service is currently unavailable" });
    }
};

module.exports = { createClass, getClasses, getClassById, updateClass, deactivateClass, activateClass };