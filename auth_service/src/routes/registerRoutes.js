const express = require('express');
const router = express.Router();
const { register, getUsers } = require('../controllers/registerController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/', register);
router.get('/', authenticateToken, getUsers);

module.exports = router;