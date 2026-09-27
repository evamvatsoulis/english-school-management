const config = require('../config/config');

const classServiceUrl = `http://${config.services.class.host}:${config.services.class.port}`;

const createEnrollment = async (req, res) => {
    try {
        const response = await fetch(
            `${classServiceUrl}/enrollments`,
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

const getEnrollmentsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const response = await fetch(`${classServiceUrl}/enrollments/students/${studentId}`, { signal: AbortSignal.timeout(5000) });
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (err) {
        return res.status(503).json({ error: "Class service is currently unavailable" });
    }
};

const getEnrollmentsByClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const response = await fetch(`${classServiceUrl}/enrollments/class/${classId}`, { signal: AbortSignal.timeout(5000) });
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
            `${classServiceUrl}/enrollments/class/${classId}/student/${studentId}`,
            {
                signal: AbortSignal.timeout(5000),
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