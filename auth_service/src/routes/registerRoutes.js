const express = require('express');
const router = express.Router();
const { register, getUsers } = require('../controllers/registerController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', register);
router.get('/users', authenticateToken, getUsers);

module.exports = router;