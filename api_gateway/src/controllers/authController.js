const config = require('../config/config');

const getUsers = async (req, res) => {
    try{
    const response = await fetch(`http://${config.host}:${config.authServicePort}/auth/users`);
    const result = await response.json();
    return res.status(response.status).json(result);
    } catch (error) {
        return res.status(503).json({ error: "Failed to fetch users" });
    }
};

module.exports = { getUsers };