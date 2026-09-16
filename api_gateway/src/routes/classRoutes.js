const express = require('express');
const router = express.Router();
const { createClass, getClasses } = require('../controllers/classController');
const{ authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.post('/', createClass);
router.get('/', getClasses);

module.exports = router;