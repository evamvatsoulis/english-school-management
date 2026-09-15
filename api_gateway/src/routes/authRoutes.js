const express = require('express');
const router = express.Router();
const { getUsers, login } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/users', authenticateToken, getUsers);
router.post('/login', login);

module.exports = router;