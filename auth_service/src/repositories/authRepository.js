const { pool } = require("../config/db");

const register = async (username, passwordHash, role) => {
    const result = await pool.query(
        `INSERT INTO users (username, password_hash, role)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [username, passwordHash, role]
    );
    return result.rows[0];
};

const getUsers = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
};

const findUserByUsername = async (username) => {
    const result = await pool.query(
        `SELECT * FROM users WHERE username = $1`, [username]
    );
    return result;
};

module.exports = { register, getUsers, findUserByUsername };