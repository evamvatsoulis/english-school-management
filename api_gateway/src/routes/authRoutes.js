const express = require('express');
const router = express.Router();
const { getUsers, updateUser, createUser, login } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/users', authenticateToken, getUsers);
router.patch('/users/:id', authenticateToken, updateUser);
router.post('/register', authenticateToken, createUser);
router.post('/login', login);

module.exports = router;