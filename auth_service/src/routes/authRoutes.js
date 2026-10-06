const express = require('express');
const router = express.Router();
const { register, getUsers, updateUser, login, deleteUser } = require('../controllers/authController');

router.post('/register', register);
router.get('/users', getUsers);
router.patch('/users/:id', updateUser);
router.post('/login', login);
router.delete('/users/:id', deleteUser);

module.exports = router;