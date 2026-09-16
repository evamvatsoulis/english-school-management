const express = require('express');
const router = express.Router();
const { createClass, getClasses, getClassById, updateClass, deactivateClass, activateClass } = require('../controllers/classController');
const{ authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.post('/', createClass);
router.get('/', getClasses);
router.get('/:id', getClassById);
router.patch('/:id', updateClass);
router.patch('/:id/deactivate', deactivateClass);
router.patch('/:id/activate', activateClass);

module.exports = router;