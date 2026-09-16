const config = require('../config/config');

const createEnrollment = async (req, res) => {
    try {
        const response = await fetch(
            `http://${config.host}:${config.classServicePort}/enrollments`,
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

const getEnrollmentsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const response = await fetch(`http://${config.host}:${config.classServicePort}/enrollments/students/${studentId}`);
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (err) {
        return res.status(503).json({ error: err.message });
    }
};

const getEnrollmentsByClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const response = await fetch(`http://${config.host}:${config.classServicePort}/enrollments/class/${classId}`);
        const result = await response.json();
        return res.status(response.status).json(result);
    } catch (err) {
        return res.status(503).json({ error: err.message });
    }
};

module.exports = { createEnrollment, getEnrollmentsByStudent, getEnrollmentsByClass };