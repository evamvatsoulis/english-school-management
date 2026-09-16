const express = require('express');
const router = express.Router();
const { createClass, getClasses, getClassById, updateClass } = require('../controllers/classController');
const{ authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.post('/', createClass);
router.get('/', getClasses);
router.get('/:id', getClassById);
router.patch('/:id', updateClass);

module.exports = router;