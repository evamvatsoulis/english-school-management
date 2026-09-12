const db = require("../config/db");

const getStudents = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM students");
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch students" });
    }
};

module.exports = { getStudents };