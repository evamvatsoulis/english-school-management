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

module.exports = { createClass };