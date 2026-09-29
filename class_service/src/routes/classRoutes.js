const express = require('express');
const router = express.Router();
const { createClass, getClasses, getClassById, updateClass, deactivateClass } = require('../controllers/classController');

router.post('/', createClass);
router.get('/', getClasses);
router.get('/:id', getClassById);
router.patch('/:id', updateClass);
router.patch('/:id/deactivate', deactivateClass);

module.exports = router;