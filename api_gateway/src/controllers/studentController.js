const config = require('../config/config');

const studentServiceUrl = `http://${config.services.student.host}:${config.services.student.port}`;

const getStudents = async (req, res) => {
    try {
        const response = await fetch(`${studentServiceUrl}/students`, { signal: AbortSignal.timeout(1000) });
        const result = await response.json();

        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: "Student service is currently unavailable" });
    }
};

const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(`${studentServiceUrl}/students/${id}`, { signal: AbortSignal.timeout(5000) });
        const result = await response.json();

        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: "Student service is currently unavailable" });
    }
};

const createStudent = async (req, res) => {
    try {
        const response = await fetch(
            `${studentServiceUrl}/students`,
            {
                signal: AbortSignal.timeout(1000),
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
        return res.status(503).json({ error: "Student service is currently unavailable" });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `${studentServiceUrl}/students/${id}`,
            {
                signal: AbortSignal.timeout(1000),
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
        return res.status(503).json({ error: "Student service is currently unavailable" });
    }
};

const deactivateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `${studentServiceUrl}/students/${id}/deactivate`,
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
        return res.status(503).json({ error: "Student service is currently unavailable" });
    }
};

const activateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `${studentServiceUrl}/students/${id}/activate`,
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
        return res.status(503).json({ error: "Student service is currently unavailable" });
    }
};

module.exports = { getStudents, getStudentById, createStudent, updateStudent, deactivateStudent, activateStudent };