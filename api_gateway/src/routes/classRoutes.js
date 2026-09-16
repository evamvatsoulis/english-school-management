const express = require('express');
const router = express.Router();
const { createClass } = require('../controllers/classController');
const{ authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.post('/', createClass);

module.exports = router;