const { pool } = require("../config/db");

const register = async (email, passwordHash, role) => {
    const result = await pool.query(
        `INSERT INTO users (email, password_hash, role)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [email, passwordHash, role]
    );
    return result;
};

const getUsers = async () => {
    return await pool.query("SELECT * FROM users");
};

module.exports = { register, getUsers };