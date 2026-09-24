const { pool } = require('../config/db');

const getStudentById = async (id) => await pool.query("SELECT * FROM students WHERE id = $1 AND active = TRUE", [id]);

const getStudents = async () => {
    const result = await pool.query("SELECT * FROM students WHERE active = TRUE ORDER BY id");
    return result.rows;
};

const createStudent = async (firstName, lastName, phone, email) => {
    const result = await pool.query(
        `INSERT INTO students (first_name, last_name, phone, email)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [firstName, lastName, phone, email]
    );
    return result.rows[0];
};

const updateStudent = async (firstName, lastName, phone, email, id) => {
    const result = await pool.query(
        `UPDATE students
        SET first_name = $1,
            last_name = $2,
            phone = $3,
            email = $4
        WHERE id = $5
        RETURNING *`,
        [firstName, lastName, phone, email, id]
    );
    return result.rows[0];
};

const deactivateStudent = async (id) => {
    const result = await pool.query(
        `UPDATE students
        SET active = FALSE
        WHERE id = $1
        RETURNING *`,
        [id]
    );
    return result.rows[0];
};

const activateStudent = async (id) => {
    const result = await pool.query(
        `UPDATE students
        SET active = TRUE
        WHERE id = $1
        RETURNING *`,
        [id]
    );
    return result.rows[0];
};

module.exports = { getStudentById, getStudents, createStudent, updateStudent, deactivateStudent, activateStudent };