const config = require('../config/config');

const getStudents = async (req, res) => {
    try {
        const response = await fetch(`http://${config.host}:${config.studentServicePort}/students`);
        const result = await response.json();

        return res.status(response.status).json(result);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch students" });
    }
};

const createStudent = async (req, res) => {
    try {
        const response = await fetch(
            `http://${config.host}:${config.studentServicePort}/students`,
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
        return res.status(503).json({ error: "Failed to create student" });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(
            `http://${config.host}:${config.studentServicePort}/students/${id}`,
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
        return res.status(503).json({ error: "Failed to create student" });
    }
}

module.exports = { getStudents, createStudent, updateStudent };