const config = require('../config/config');

const createEnrollment = async (req, res) => {
    try {
        const response = await fetch(
            `http://${config.host}:${config.services.class.port}/enrollments`,
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

const getEnrollmentsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const response = await fetch(`http://${config.host}:${config.services.class.port}/enrollments/students/${studentId}`);
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (err) {
        return res.status(503).json({ error: "Class service is currently unavailable" });
    }
};

const getEnrollmentsByClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const response = await fetch(`http://${config.host}:${config.services.class.port}/enrollments/class/${classId}`);
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (err) {
        return res.status(503).json({ error: "Class service is currently unavailable" });
    }
};

const deleteEnrollment = async (req, res) => {
    try {
        const { classId, studentId } = req.params;
        const response = await fetch(
            `http://${config.host}:${config.services.class.port}/enrollments/class/${classId}/student/${studentId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (err) {
        return res.status(503).json({ error: "Class service is currently unavailable" });
    }
};

module.exports = { createEnrollment, getEnrollmentsByStudent, getEnrollmentsByClass, deleteEnrollment };