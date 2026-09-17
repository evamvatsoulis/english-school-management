const config = require('../config/config');

const createClass = async (req, res) => {
    try {
        const response = await fetch(
            `http://${config.host}:${config.services.class.port}/classes`,
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
        return res.status(503).json({ error: "Class service is currently unavailable" });
    }
};

const getClasses = async (req, res) => {
    try {
        const response = await fetch(`http://${config.host}:${config.services.class.port}/classes`);
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (err) {
        return res.status(503).json({ error: "Class service is currently unavailable" });
    };
};

const getClassById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(`http://${config.host}:${config.services.class.port}/classes/${id}`);
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
            `http://${config.host}:${config.services.class.port}/classes/${id}`,
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

const deactivateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `http://${config.host}:${config.services.class.port}/classes/${id}/deactivate`,
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

const activateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `http://${config.host}:${config.services.class.port}/classes/${id}/activate`,
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