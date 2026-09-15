const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/users', authenticateToken, getUsers);

module.exports = router;