const express = require('express');
const router = express.Router();
const { getUsers, createUser, login } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/users', authenticateToken, getUsers);
router.post('/register', authenticateToken, createUser);
router.post('/login', login);

module.exports = router;