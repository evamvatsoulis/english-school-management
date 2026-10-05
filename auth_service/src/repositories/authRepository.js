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
    return result.rows[0];
};

const getUserById = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
};

const updateUser = async (username, password, role, id) => {
    const result = await pool.query(
        `UPDATE users
        SET username = $1,
            password_hash = $2,
            role = $3
        WHERE id = $4
        RETURNING *`,
        [username, password, role, id]
    );
    return result.rows[0];
};

module.exports = { register, getUsers, findUserByUsername, getUserById, updateUser };