const express = require('express');
const router = express.Router();
const { getUsers, updateUser, register, login } = require('../controllers/authController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

router.post('/login', login);

router.use(authenticateToken, requireAdmin);

router.get('/users', getUsers);
router.patch('/users/:id', updateUser);
router.post('/register', register);


module.exports = router;