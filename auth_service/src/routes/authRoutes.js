const express = require('express');
const router = express.Router();
const { register, getUsers, login } = require('../controllers/authController');

router.post('/register', register);
router.get('/users', getUsers);
router.post('/login', login);

module.exports = router;