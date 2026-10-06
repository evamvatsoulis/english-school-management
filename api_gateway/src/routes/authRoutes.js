const express = require('express');
const router = express.Router();
const { getUsers, updateUser, register, login } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/users', authenticateToken, getUsers);
router.patch('/users/:id', authenticateToken, updateUser);
router.post('/register', authenticateToken, register);
router.post('/login', login);

module.exports = router;