const { pool } = require('../config/db');

const createClass = async (name, schoolYear, monthlyFee) => {
    const result = await pool.query(
        `INSERT INTO classes (name, school_year, monthly_fee)
            VALUES ($1, $2, $3)
            RETURNING *`,
        [name, schoolYear, monthlyFee]
    );
    return result.rows[0];
};

const getClasses = async () => {
    const result = await pool.query("SELECT * FROM classes ORDER BY id");
    return result.rows;
};

const getClassById = async (id) => {
    const result = await pool.query(`SELECT * FROM classes WHERE id = $1`, [id]);
    return result.rows[0];
};

const updateClass = async (name, schoolYear, monthlyFee, id) => {
    const result = await pool.query(
        `UPDATE classes
        SET name = $1,
            school_year = $2,
            monthly_fee = $3
        WHERE id = $4
        RETURNING *`,
        [name, schoolYear, monthlyFee, id]
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