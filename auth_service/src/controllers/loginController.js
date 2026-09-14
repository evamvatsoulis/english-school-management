const bcrypt = require("bcrypt");
const { findUserByEmail } = require('../repositories/loginRepository');

const passwordMatches = async (password, passwordHash) => bcrypt.compare(password, passwordHash);

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await findUserByEmail(email);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        if (!await passwordMatches(password, user.password_hash)) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        return res.status(200).json({ message: "Login succesfull" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { login };