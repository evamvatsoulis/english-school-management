const { pool } = require('../config/db');

const createClass = async (name, schoolYear) => {
    const result = await pool.query(
        `INSERT INTO classes (name, school_year)
            VALUES ($1, $2)
            RETURNING *`,
        [name, schoolYear]
    );
    return result.rows[0];
};

const getClasses = async () => {
    const result = await pool.query("SELECT * FROM classes WHERE active = true ORDER BY id");
    return result.rows;
};

const getClassById = async (id) => {
    const result = await pool.query(`SELECT * FROM classes WHERE id = $1`, [id]);
    return result.rows[0];
};

const updateClass = async (name, schoolYear, id) => {
    const result = await pool.query(
        `UPDATE classes
        SET name = $1,
            school_year = $2
        WHERE id = $3
        RETURNING *`,
        [name, schoolYear, id]
    );
    return result.rows[0];
};

const deactivateClass = async (id) => {
    const result = await pool.query(`UPDATE classes SET active = FALSE WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
};

const activateClass = async (id) => {
    const result = await pool.query(`UPDATE classes SET active = TRUE WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
};

module.exports = { createClass, getClasses, getClassById, updateClass, deactivateClass, activateClass };