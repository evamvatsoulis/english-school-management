const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require('../repositories/loginRepository');

const passwordMatches = async (password, passwordHash) => bcrypt.compare(password, passwordHash);

const generateToken = (user) => {
    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
    return token;
};

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

        const token = generateToken(user);

        return res.status(200).json({ message: "Login succesfull", token });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { login };