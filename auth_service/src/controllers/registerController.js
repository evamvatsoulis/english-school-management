const bcrypt = require("bcrypt");
const { register: registerRepository } = require('../repositories/registerRepository');

const encryptPassword = async (password) => bcrypt.hash(password, 10);

const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const passwordHash = await encryptPassword(password);
        const result = await registerRepository(email, passwordHash, role);

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { register };