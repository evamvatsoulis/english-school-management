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
        `SELECT e.id, e.student_id, e.class_id, c.name, c.school_year
        FROM enrollments e JOIN classes c ON e.class_id = c.id
        WHERE e.student_id = $1 AND c.active = TRUE`, [studentId]
    );
    return result.rows;
};

const getStudentsIdsByClass = async (classId) => {
    const result = await pool.query(
        `SELECT * FROM enrollments
        WHERE class_id = $1`, [classId]
    );
    return result.rows;
};

const getEnrollment = async (classId, studentId) => {
    const result = await pool.query(
        `SELECT * FROM enrollments
        WHERE class_id = $1 AND student_id = $2`, [classId, studentId]
    );
    return result.rows;
};

const deleteEnrollment = async (classId, studentId) => {
    const result = await pool.query(
        `DELETE FROM enrollments
        WHERE class_id = $1 AND student_id = $2`, [classId, studentId]
    );
    return result.rows[0];
};

module.exports = { createEnrollment, getEnrollmentsByStudent, getStudentsIdsByClass, getEnrollment, deleteEnrollment };