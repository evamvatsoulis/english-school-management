const express = require('express');
const router = express.Router();
const { getUsers, updateUser, register, login, deleteUser } = require('../controllers/authController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

router.post('/login', login);

router.use(authenticateToken, requireAdmin);

router.get('/users', getUsers);
router.patch('/users/:id', updateUser);
router.post('/register', register);
router.delete('/users/:id', deleteUser);


module.exports = router;