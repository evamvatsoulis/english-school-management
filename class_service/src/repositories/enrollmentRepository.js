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

const getEnrollmentsByStudent = async (studentId) => {
    const result = await pool.query(
        `SELECT e.id, e.student_id, e.class_id, c.name, c.school_year, c.monthly_fee
        FROM enrollments e JOIN classes c ON e.class_id = c.id
        WHERE e.student_id = $1`, [studentId]
    );
    return result.rows;
};

const getEnrollmentsByClass = async (classId) => {
    const result = await pool.query(
        `SELECT s.id, s.first_name, s.last_name
        FROM enrollments e JOIN students s ON e.student_id = s.id
        WHERE e.class_id = $1`, [classId]
    );
    return result.rows;
};

module.exports = { createEnrollment, getEnrollmentsByStudent, getEnrollmentsByClass };