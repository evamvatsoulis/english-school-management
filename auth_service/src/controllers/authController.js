const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { register: registerRepository, getUsers: getUsersRepository, findUserByEmail } = require('../repositories/authRepository');

const encryptPassword = async (password) => bcrypt.hash(password, 10);

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

const getUsers = async (req, res) => {
    try {
        const result = await getUsersRepository();
        return res.status(200).json(result.rows);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
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

module.exports = { register, getUsers, login };