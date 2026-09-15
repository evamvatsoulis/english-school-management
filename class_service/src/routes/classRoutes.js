const express = require('express');
const router = express.Router();
const { createClass, getClasses, getClass, updateClass, deactivateClass, activateClass } = require('../controllers/classController');

router.post('/', createClass);
router.get('/', getClasses);
router.get('/:id', getClass);
router.patch('/:id', updateClass);
router.patch('/:id/deactivate', deactivateClass);
router.patch('/:id/activate', activateClass);

module.exports = router;