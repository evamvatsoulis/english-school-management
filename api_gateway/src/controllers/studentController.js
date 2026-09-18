const config = require('../config/config');

const getStudents = async (req, res) => {
    try {
        const response = await fetch(`http://${config.host}:${config.services.student.port}/students`);
        const result = await response.json();

        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: "Student service is currently unavailable" });
    }
};

const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(`http://${config.host}:${config.services.student.port}/students/${id}`);
        const result = await response.json();

        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: "Student service is currently unavailable" });
    }
};

const createStudent = async (req, res) => {
    try {
        const response = await fetch(
            `http://${config.host}:${config.services.student.port}/students`,
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
        return res.status(503).json({ error: "Student service is currently unavailable" });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `http://${config.host}:${config.services.student.port}/students/${id}`,
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

const deactivateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `http://${config.host}:${config.services.student.port}/students/${id}/deactivate`,
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
            `http://${config.host}:${config.services.student.port}/students/${id}/activate`,
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