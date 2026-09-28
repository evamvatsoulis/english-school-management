const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { register: registerRepository, getUsers: getUsersRepository, findUserByUsername } = require('../repositories/authRepository');

const encryptPassword = async (password) => bcrypt.hash(password, 10);

const passwordMatches = async (password, passwordHash) => bcrypt.compare(password, passwordHash);

const notFound = (result) => result.length === 0;

const generateToken = (user) => {
    const token = jwt.sign(
        {
            userId: user.id,
            username: user.username,
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
        const { username, password, role } = req.body;

        const passwordHash = await encryptPassword(password);
        const result = await registerRepository(username, passwordHash, role);

        return res.status(201).json({ message: "User added", result });
    } catch (error) {
        return res.status(500).json({ error: "Failed to create user" });
    }
};

const getUsers = async (req, res) => {
    try {
        const result = await getUsersRepository();

        if (notFound(result)) {
            return res.status(200).json({ message: "There are no users", result: [] });
        }
        return res.status(200).json({ message: "Users loaded successfully", result });
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch users" })
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await findUserByUsername(username);

        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        if (!await passwordMatches(password, user.password_hash)) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = generateToken(user);

        return res.status(200).json({ message: "Successfull login", token });
    } catch (err) {
        return res.status(500).json({ error: "Login failed" });
    }
};

module.exports = { register, getUsers, login };