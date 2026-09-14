const config = require('../config/config');

const getStudents = async (req, res) => {
    try {
        const response = await fetch(`http://${config.host}:${config.studentServicePort}/students`);
        const result = await response.json();
        if(!response.ok){
            return res.status(400).json({ error: result.error });
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch students" });
    }
};

module.exports = { getStudents };