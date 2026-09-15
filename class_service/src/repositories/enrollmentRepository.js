const { pool } = require('../config/db');

const createEnrollment = async (studentId, classId) => {
    const result = await pool.query(
        `INSERT INTO enrollments (student_id, class_id)
            VALUES ($1, $2)
            RETURNING *`,
        [studentId, classId]
    );
    return result.rows[0];
};

module.exports = { createEnrollment };